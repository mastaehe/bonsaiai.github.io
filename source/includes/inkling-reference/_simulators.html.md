# Simulators

```inkling--code
simulator MySimulator(MySchemaConfig)
  state (MyStateSchema)
  action (MyActionSchema)
end
```

Curriculum statements reference an associated simulator in the with clause. Each
simulator used in a curriculum must be declared in a simulator statement.  

The simulator statement describes the interface to a simulator. Simulators are
generally implemented in python or C++. The inkling program does not contain
code for the simulator itself. Instead the Inkling program defines how the
simulator is used to train Inkling concepts.

> Simulator Clause Syntax

```inkling--syntax
simulator <simulatorName>'('<configurationSchema>')' 
  state '('<stateSchema>')'     # simulator state
  control '('<controlSchema>')' # training concept predicts schema
end
```

A simulator statement associates a set of schemas with the simulator. 

* The configuration schema is used for initialization. 
* The action schema describes the simulator input.
* The state schema describes the simulator output.

### Usage

```inkling--code
curriculum ball_location_curriculum
  train ball_location
  with simulator breakout_simulator
  objective ball_location_distance
  ... 
```

The curriculum specifies which simulator it uses. The example in the panel to
the right shows the use of simulator `breakout_simulator`. 

### Discussion

Simulators are virtual environments designed to simulate a real world situation
or problem. Every simulator has state, a representation of the world inside the
virtual environment. This state changes over time in response to actions taken
by an agent. 

The simulator and the BRAIN are in a loop where a BRAIN is receiving a frame 
of state from the simulator, followed by the BRAIN selecting a next action. 
The simulator then changes state in response to that action. The BRAIN then
receives this new updated frame of state from the simulator and selects a new
next action, so on and so on, until the BRAIN learns how to best operate the simulation.

Our [Library Reference][1] describes the classes and methods used to connect an existing simulator or create a new simulator in Python. [Find the Center][2] is an example of a basic simulator implementation.

### Example

```inkling--code

simulator breakout_simulator(BreakoutConfig)
  action  (PlayerMove)
  state (GameState)
end

schema GameState
  Luminance(84, 336) pixels
end

schema PlayerMove
  Int8{-1, 0, 1} move
end

schema BreakoutConfig
  UInt32 level,
  UInt8{1:4} paddle_width,
  Float32 bricks_percent
end

concept high_score is classifier
  predicts (PlayerMove)
  follows input(GameState)
  feeds output
end

curriculum high_score_curriculum
  train high_score
  with simulator breakout_simulator
  objective score
    lesson score_lesson
      configure
        constrain bricks_percent with Float32{1.0},
        constrain level with UInt32{1:100},
        constrain paddle_width with UInt8{1:4}
      train
        from frame in breakout_simulator
        select frame
        send frame
      test
        from frame in breakout_simulator
        select frame
        send frame
      until
        maximize score
end
```

In this example we show some of the Inkling code for training breakout.
The curriculum `with` clause specifies `breakout_simulator`, and the
simulator statement specifies the action, state, and configuration schemas. 

The curriculum specifies the `objective` function, in this case it is
`score`. The `objective` function (which is sometimes called 
the reward function in the literature) is implemented in the simulator. 
(Eventually implementing objective functions in Inkling will be supported.)

[1]: ./library-reference.html
[2]: ./../examples.html#find-the-center-example
[3]: #curriculum
