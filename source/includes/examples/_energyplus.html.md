# EnergyPlus HVAC Optimization

> ![EnergyPlus Graph](../images/energyplus-graph.png)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally. If you want to run EnergyPlus remotely on the Bonsai Platform as a managed simulator, create a new BRAIN selecting the EnergyPlus demo on [beta.bons.ai][4].

In this example, we'll walk you through the various statements that are part of a sample implementation of [EnergyPlus][2] on the Bonsai Platform, including the simulator and the Inkling files. This is a real-world example of how to use the Bonsai Platform for HVAC control using BCVTB and EnergyPlus.

While this BRAIN is training, the Bonsai AI Engine launches the EnergyPlus simulator in the background for every episode. The *energyplus_simulator.py* then drives the simulator forward a step at a time until it finishes the episode and then relaunches it for the next episode, driving the actions into it and sending state results back to the Bonsai AI Engine.

## Inkling File

###### Schema

```inkling
schema SimState
    Int32{0:10} SolarIrradiation
end
```

The `SimState` schema defines the dictionary returned from the Python simulation's `advance` method to the BRAIN.

```inkling
schema SimAction
    Int32 {0, 1} shade
end
```

The `SimAction` schema defines the 'actions', a dictionary of control signals this AI can send to the climate control. For example: `shade` == night, off, day.

```inkling
schema SimConfig
    Int32{-1} unused
end
```

The `SimConfig` schema in this case is not used (but is still required to be defined in Inkling) but it would define the dictionary passed as a parameter to the `set_properties` method of the Python simulator.

###### Concept

```inkling
concept my_concept is classifier
   predicts (SimAction)
   follows input(SimState)
   feeds output
end
```

This concept is named `my_concept` which predicts a `SimAction` given a `SimState`. In this simple demo we just ask the Bonsai Platform to generate any model that can learn to control the server using these inputs and outputs.

###### Simulator

```inkling
simulator energyplus_simulator(SimConfig)
    action (SimAction)
    state (SimState)
end
```


The simulator clause declares that a simulator named `energyplus_simulator` will be connecting to the server for training. This code snippet binds the previous schemas to this simulator. To define the training relationship between the simulator and the concept we must begin by defining the simulator. `energyplus_simulator` expects an action defined in the `SimAction` schema as input and replies with a state defined in the `SimState` schema as output.

###### Curriculum

```inkling
curriculum my_curriculum
    train my_concept
    with simulator energyplus_simulator
    objective reward_function
        lesson my_first_lesson
            configure
                constrain unused with Int32{-1}
            until
                maximize reward_function
end
```

The curriculum `my_curriculum` trains `my_concept` using `energyplus_simulator`. The BRAIN that runs this Inkling code will try to maximize the value returned from `reward_function` until you stop training. `reward_function` is a method in the Python simulator.

This curriculum contains one lesson, called `my_first_lesson`. It configures the simulation, by setting a number of constraints for the state of the simulator.

## Simulator Excerpt

```python
# Excerpt of simulator class from the energyplus_simulator.py file

class EnergyPlusSimulator(Simulator):
    model = ePlus85Actuator()
    server = None

    clientState = {'SolarIrradiation': 0}
    shade = 0.
    is_terminal = True

    def start(self):
        """This method is called when training is started."""
        print("EnergyPlusSimulator: start")

    def stop(self):
        print("EnergyPlusSimulator: stop")

        graph = self.model.grapher()
        py.plot(graph, filename="graph.html")

    def readFromPtolemyClient(self):
        self.server.readFromClient()
        if self.model.fromClient and len(self.model.fromClient) == 4:
            self.clientState = {
                # 'TOut': self.model.fromClient[0],
                # 'TZone': self.model.fromClient[1],
                'SolarIrradiation': int(self.model.fromClient[2])/100
                # 'FractionShadingOn': self.model.fromClient[3]
                }

            # save the client input in our graph
            for n in range(len(self.model.fromClient)):
                value = self.model.fromClient[n]
                # scale some of the values for readability
                if n == 2:
                    value /= 100.
                self.model.data[n].append(value)

        self.is_terminal = self.model.exitFlag != 0

    def restartPtolemyServer(self):
        # set some default values for get_state
        self.is_terminal = True
        # self.clientState = {'TOut': 0.,
        #                     'TZone': 0.,
        #                     'SolarIrradiation': 0.,
        #                     'FractionShadingOn': 0. }
        self.clientState = {'SolarIrradiation': 0}

        # close the old connections if they're still open
        if self.server:
            self.server.close()

        # start a new episode
        print("EnergyPlusSimulator: starting PtolemyServer")
        self.server = PtolemyServer(self.model)

        try:
            self.server.start()
            self.server.waitForClient()
            # get initial state
            self.readFromPtolemyClient()

        except OSError as msg:
            print("EnergyPlusSimulator: error on restart:", msg)
            self.server = None

    def reset(self):
        """Called by the AI Engine to reset simulator state in between training
           and test passes.
        """
        print("EnergyPlusSimulator: reset")

    def advance(self, actions):
        print("EnergyPlusSimulator: advance ", actions)
        """Advance the simulation forward one tick. actions contains a
           dictionary of key values as defined by this simulator's action
           schema in Inkling.
        """
        self.shade = actions['shade'] * 6.  # Int32[0..1]

    def set_properties(self, **kwargs):
        print("EnergyPlusSimulator: set_properties")
        """This method is called before training is started
           or on the frame after is_terminal=True to set
           configuration properties in this simulation. See
           the configure clause of the lesson statement in
           this simulator's accompanying curriculums.
        """
        self.restartPtolemyServer()

    def get_state(self):
        """Returns a named tuple of state and is_terminal. state is a
           dictionary matching the state schema as defined in Inkling.
           is_terminal is only true when the simulator is in a "game over"
           state.
        """

        print("EnergyPlusSimulator: get_state: terminal:", self.is_terminal)

        if self.is_terminal:
            self.restartPtolemyServer()
        else:
            self.server.writeToClient([self.shade])
            self.readFromPtolemyClient()

        # you like graphs? WE HAVE GRAPHS. SO MANY GRAPHS.
        if self.is_terminal:
            graph = self.model.grapher()
            write_graph(graph)

            # clear old data
            self.model.data = ([], [], [], [], [])

        return SimState(state=self.clientState, is_terminal=self.is_terminal)

    def reward_function(self):
        print("EnergyPlusSimulator: reward_function")
        # largest reward is best reward (maximize)
        reward = 0.
        if self.model.fromClient and len(self.model.fromClient) == 4:
            # SolarIrradiation === Shades down === good
            # TOut = self.model.fromClient[0]
            SolarIrradiation = self.model.fromClient[2] / 100.

            # sun is down
            if SolarIrradiation <= 1:
                if self.shade > 0:
                    reward = -1  # shades on
                else:
                    reward = 1  # shade off

            # sun is out
            else:
                if self.shade > 0: 
                    reward = 1  # shades on
                else:
                    reward = -1  # shades off

            self.model.data[4].append(reward)

        print("EnergyPlusSimulator reward:", reward)
        return reward
```

The full simulator file *energyplus_simulator.py* for this example is with the rest of the [energyplus-sample code][1] on GitHub.

This is a Python simulator for integrating the EnergyPlus simulator into the Bonsai AI Engine. This *energyplus_simulator.py* file repeatedly runs the EnergyPlus simulator in the background with new actions sent from the Bonsai AI Engine by passing the state from EnergyPlus to the backend, and the action from the backend back to EnergyPlus.

For more information on the functions inside of this simulator class and how to implement them see the [Library Reference][3].

[1]: https://github.com/BonsaiAI/energyplus-sample
[2]: https://energyplus.net/
[3]: http://docs.bons.ai/references/library-reference.html
[4]: https://beta.bons.ai/new
