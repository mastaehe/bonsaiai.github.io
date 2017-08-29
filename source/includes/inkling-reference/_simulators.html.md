# Simulators

```inkling--code
simulator simulatorName(schemaConfig)
  state (stateSchema)
  action (actionSchema)
end
```

[Remove text about generators]

Curriculum statements reference an associated simulator or generator in the with clause. Each simulator or generator used must be declared in a simulator statement.  A simulator statement associates a set of schemas with the simulator. The set varies slightly depending on whether it is a simulator or generator.

For a simulator the action can be thought of as input and the state as output.

--------> below is current web description

Simulators are interactive virtual environments. Every simulator has state, a representation of the world inside the virtual environment. This state almost always changes over time and in response to actions taken by an AI or other agent. The AI and the simulator are in a loop where a BRAIN is receiving a frame of state from the simulator, then, the BRAIN is selecting a next action. Next, the simulator changes state in response to that action. The BRAIN then receives this new updated frame of state from the simulator and selects a new next action, so on and so on until the BRAIN learns how to best operate the simulation.

Our [Library Reference][1] describes the classes and methods used to connect an existing simulator or create a new simulator in Python. [Find the Center][2] is an example of a basic simulator implementation.

> Simulator Clause Syntax

```inkling--syntax
simulator <simulatorName>'('<configurationSchema>')' 
  state '('<stateSchema>')'     # simulator state
  control '('<controlSchema>')' # training concept predicts schema
end
```

When a simulator is used for training, use the simulator clause. It is **required** to pass a _configurationSchema_ into the simulator, even if the configuration is empty.

### Usage

[Fill out or delete as needed.]

### Discussion

[Fill out or delete as needed.]

### Example

```inkling--syntax
simulator breakout_simulator(BreakoutConfig) 
   state (GameState) 
   action (PlayerMove)    
end
```

[Fill out more text description of this example.]

[1]: ./library-reference.html
[2]: ./../examples.html#find-the-center-example
[3]: #curriculum
