# Simulators

```inkling--code
simulator MySimulator(MySchemaConfig)
  state (MyStateSchema)
  action (MyActionSchema)
end
```

Curriculum statements reference an associated simulator in the [with clause][3]. Each
simulator used in a curriculum must be declared in a `simulator` statement.  

The `simulator` statement describes the interface to a simulator. Simulators are
implemented in Python or C++. The Inkling program does not contain
code for the simulator itself. Instead the Inkling program defines how the
simulator is used to train Inkling concepts.

> Simulator Clause Syntax

```inkling--syntax
simulator <simulatorName>'('<configurationSchema>')' 
  state '('<stateSchema>')'     # simulation's current state
  action '('<actionSchema>')'   # BRAIN's next action
end
```

A `simulator` statement associates a set of schemas with the simulator. 

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

The curriculum specifies which simulator it uses. The example in the code panel
shows the use of simulator `breakout_simulator`. 

### Discussion

Simulators are virtual environments designed to simulate a real world situation
or problem. Every simulator has a state, a representation of the world inside the
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
      until
        maximize score
end
```

In this example we show some of the Inkling code for training the game Breakout.
The curriculum `with` clause specifies `breakout_simulator`, and the
`simulator` statement specifies the action, state, and configuration schemas. 

The curriculum specifies the `objective` function, in this case it is
`score`. The `objective` function (which is sometimes called 
the reward function in the literature) is implemented in the simulator. 
(Eventually implementing objective functions in Inkling will be supported.)

# Integrating a Simulator with Inkling

> ![Simulator Diagram](../images/inkling_simulator_comparison.png)

This table describes the colors and connections between the various parts of the Inkling file and Simulator file that must be the same or connected. The source code for this example, [Find the Center][4], is available if you wish to copy/paste this example.

| Color               | Description  |
| -                   | -  |
| Purple (dark/light) | The Inkling state schema field names and types must match the state dictionaries returned from `episode_start` and `simulate` in the simulator. |
| Blue (dark/light)   | The Inkling action schema field names will match the keys in the action dictionary passed to `simulate` in the simulator, and the values will have the types specified in Inkling, and will obey the specified constraints (`{-1, 0, 1}` in the example). |
| Orange (dark/light) | The simulator's configuration passes as `parameters` to the `episode_start`, and will take values from the `constrain` clause in Inkling. |
| Red                 | The name of the concept must match the `train` clause in the curriculum for that concept. |
| Green               | The simulator name must match between the `simulator` clause and the `with simulator` clause in the curriculum. The simulator must pass the same name to the constructor of the `Simulator` class, so the AI engine knows which simulator is connected. |
|Turquoise            | The name of the optimization objective or reward function appears twice in the Inkling, and is available as `self.objective_name` in the simulator. |

<aside class="notice">
Note that config in __main__ is the brain configuration and remains the same throughout, whereas goal_config (highlighted in orange) is used at the beginning of every episode and must be named the same as it is in Inkling. These configs are unrelated.
</aside>

[1]: ./library-reference.html
[2]: ./../examples.html#basic-python-c-simulation
[3]: #curriculums
[4]: ../../examples.html#inkling-file
