# SimPy Elevator Simulation

> ![ASCII Elevator Output](../images/elevator_output.png)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally.

In this example, [SimPy][2], a process-based discrete-event simulation framework based on standard Python, is used to simulate an elevator effectively transporting people to their desired floor. The simulated elevator gets rewarded by having people wait for the least amount of time. This example includes a simple elevator SimPy simulator, a Python simulation, and the simulation's Inkling file.

"Processes in SimPy are defined by Python generator functions and may, for example, be used to model active components like customers, vehicles or agents. SimPy also provides various types of shared resources to model limited capacity congestion points (like servers, checkout counters and tunnels)." - SimPy docs

This simulation is to provide actions (up, down, open doors) for an elevator, given floor requests from randomly arriving passengers. SimPy has a great framework for simulating time only when some state changes, which speeds up training for systems that would otherwise be mostly waiting.

In the image to the right, the elevator logs output every 100 seconds, then shows the state of the world, and then a list of recent passengers. The world state is the floor, the number of people waiting, plus the elevator, and the number of people inside.

`1: 0| 2: 1| 3: 0| [_1_]` shows zero people on the first floor, one person waiting on the second floor, and one person in the elevator on the third floor.

For more ideas of how SimPy can simulate real world problems see the [SimPy Examples page][4].

## Inkling File

###### Schema

```inkling
# Position is current location of elevator
# State of each floor: 1 if the floor is requested, 0 if not
schema FloorState
    Int8{0, 1, 2} Position,
    Int8{0, 1} Floor1,
    Int8{0, 1} Floor2,
    Int8{0, 1} Floor3
end
```

The `FloorState` schema defines the dictionary returned from the Python simulation's `advance` method to the BRAIN.

```inkling
# command options: up, open, down
schema Action
    Int8{0, 1, 2} command
end
```

The `Action` schema defines the possible actions the elevator can take. In this case the command given to the elevator is '0' is open, '1' is go up a floor, and '2' is go down a floor.

```inkling
# Possible option for configuration
schema ElevatorConfig
    Int8 episode_length
end
```

The `ElevatorConfig` schema outlines some possible configurations you could give to the elevator if you wanted to tailor its learning in the lessons outlined later.

###### Concept

```inkling
# Predicts an Action and follows input from the FloorState schema
concept elevator_plan is classifier
    predicts (Action)
    follows input(FloorState)
    feeds output
end
```

This concept is named `elevator_plan`, a classifier, which predicts an `Action` given the current `FloorState`. In this simple example, we are training the concept to make an action (go up a floor, go down a floor, or open the doors) based on the current state of the floor the elevator is on.

###### Simulator

```inkling
# Connect to SimPy simulator for training
simulator elevator_simulator(ElevatorConfig)
    action (Action)
    state (FloorState)
end
```

The simulator clause declares that a simulator named `elevator_simulator` will be connecting to the server for training. This `elevator_simulator` expects an action defined in the `Action` schema as input and replies with a state defined in the `FloorState` schema as output.

###### Curriculum

```inkling
# This trains the concept using a single lesson
# Maximize the elevator_objective defined in elevator_simulator.py
curriculum high_score_curriculum
    train elevator_plan
    with simulator elevator_simulator
    objective elevator_objective
        lesson get_high_score
            configure
                constrain episode_length with Int8{-1}
            until
                maximize elevator_objective
end
```

The curriculum `high_score_curriculum` trains `elevator_plan` using `elevator_simulator`. The BRAIN that runs this Inkling code will try to maximize the value returned from `elevator_objective` until you stop training. The reward function passed to `elevator_objective` is a method in the simulator `elevator_simulator.py` in which it returns the waiting time of the total sum of people as a negative number, in order to maximize it. The code for this can be seen at the end of the simulator excerpt below.

This curriculum contains one simple lesson, called `get_high_score`. It configures the simulation, but in this case the lesson is simply using a dummy variable to not provide the elevator with any starting conditions to learn from. The training starts from random placement and actions.


## Simulator Excerpt

```python
# Excerpt of simulator class from the elevator_simulator.py file

class ElevatorSimulator(Simulator):

    def episode_start(self, parameters=None):
        print('called episode_start')
        self.env = env = simpy.Environment()
        floors = [simpy.Resource(env, 1) for _ in range(0, BUILDING_SIZE)]
        store = simpy.Store(env, 1)
        state = elevator.Lstate()
        person_score = []
        reqs = []
        env.process(elevator.claim(floors, reqs))
        env.process(elevator.person_generator(env, floors, person_score))
        env.process(elevator.display_process(env, person_score, state))

        # We use the single step version of elevator (elevator_one)
        # this allows the simulator to run until the elevator uses a command.
        ep = env.process(
            elevator.elevator_one(env, floors, state, store, reqs))

        self.floors = floors
        self.store = store
        self.state = state
        self.person_score = person_score
        self.reqs = reqs
        self.ep = ep

        return Simulator.State(json.dumps(self._get_state()))

    def simulate(self, json_action, objective=None):
        action = json.loads(json_action)

        # TODO - sounds like previous state should replace the internal state..
        command = action['command']
        env = self.env
        # print('[advance]', end='')
        # print('command: {}'.format(command))
        self.state.command = command

        # pass our command to a resource by way of this doit() method
        env.process(doit(self.store, command))

        env.run(until=self.ep)
        self.ep = env.process(elevator.elevator_one(
            self.env, self.floors, self.state, self.store, self.reqs))
        # print('stepped to {}'.format(env.now))

        state = self._get_state()
        done = self._get_done()
        reward = None
        if objective is not None:
            reward = self._elevator_objective()

        return Simulator.State(json.dumps(self._get_state()), reward, done)

    def _get_state(self):
        """ This function must be implemented for all simulators.
        During training and prediction, this is used to construct the state
        message that represents the current simulation state.
        It is assumed that this function returns Simulator.State objects """

        # print('[get_state]', end='')

        # if a floor is requested, state=1
        values = [min(len(q.queue), 1) for q in self.floors]
        state = {'Floor{}'.format(ix+1): v for ix, v in enumerate(values)}
        state['Position'] = self.state.floor
        # print(state)

        return state

    def _get_done(self):
        self.done = done = self.env.now > SIM_TIME
        return done

    def _elevator_objective(self):
        # print('[objective]', end='')
        waiting = elevator.count_waiting(self.person_score)
        # print("returning score %d for %d people" % (active, len(scores)))

        # return as negative because the simulator maximizes this value.
        return -waiting
```

The full simulator file *elevator_simulator.py* and elevator simulation file *elevator.py* for this example is with the rest of the [simpy-elevator code][1] on GitHub.

This is a Python simulator which uses the elevator.py custom Python simulation using SimPy. This *elevator_simulator.py* file repeatedly runs the elevator simulation for each episode of training to get details of where people start out, how many are on the elevator, and what floor they are going to, etc. Each episode the curriculum in Inkling trains the concept by sending a new `Action` to the BRAIN based on the `FloorState` of the simulator.

The `_elevator_objective` function returns a negative waiting value because this value is going to be maximized, and we want to actually minimize the collective group of people's wait time.

For more information on the functions inside of this simulator class and how to implement them see the [Library Reference][3].

Also note that if you would like to see how this simulator can be run without Bonsai - to demonstrate how the emulator behaves with a hard-coded algorithm - you can do so by running elevator.py simply with Python itself.

[1]: https://github.com/BonsaiAI/simpy-elevator-sample
[2]: https://simpy.readthedocs.io/en/latest/index.html
[3]: http://docs.bons.ai/references/library-reference.html
[4]: https://simpy.readthedocs.io/en/latest/examples/index.html#examples
