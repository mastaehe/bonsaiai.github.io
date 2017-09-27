# Curriculums

```inkling--code
curriculum MyCurriculum
  train MyConcept
  with simulator MySimulator
  objective MyObjective
    # lessons are specified here.
end
```

The Inkling curriculum statement is used to specify the training of Inkling concepts. 

The curriculum specifies the concept which is being taught. 
The lessons defined within the curriculum are used to train that concept.

> Curriculum Syntax

```inkling--syntax
curriculum <name>                            
train  <conceptName>                        
[ 
  with simulator <simulatorName>  
  objective <objectiveFunctionName> 
]+ 
[
  using <simulatorName>             # using clause
  [
    lessonClause # lesson set for this simulator
  ]+
  end # using
]+
end # curriculum
```   
### Usage

There can be only one curriculum per concept.

Every concept must have a curriculum.

Every simulator must be declared with a simulator clause.

The `train` keyword indicates which concept this curriculum trains.

The `objective` keyword specifies the objective function.  This function
specifies the termination condition for training. It is always required. 

If the curriculum uses one simulator, the `using simulator` clause is optional. For more
than one simulator, the `using simulator` clause is required to associate a lesson set
with a specified simulator. In that case, there must be one `using simulator` 
clause for every simulator specified in the `with simulator` clause. 

### Discussion

The concept graph is laid out by the architect and then handed to the
instructor. The instructor will look for the starting point among the concepts and
their corresponding curriculums, and then will use the curriculum to train
the concept.

A curriculum (and its concept) is associated with a set of simulators and each
simulator has an objective function and a schema. The instructor trains each
concept using a simulator with the specified objective function. 

The lesson clause configures the lesson and describes training and the objective. For more information see the section on [lessons][].


### Breakout Example

> Breakout Example

```inkling--code
simulator breakout_simulator(BreakoutConfig) 
  action  (PlayerMove)
  state  (GameState)
end
```

The simulator clause declares the simulator name and several schemas. The first
schema specifies the schema for configuration of the simulator and it appears in
parentheses immediately after the simulator name. In this instance, the
configuration schema is named `BreakoutConfig`. In the example, the configure
clauses of the lessons initializes the configuration schema fields of `BreakoutConfig`.


```inkling--code
schema BreakoutConfig
    UInt16 level,
    UInt8{1:4} paddle_width,
    Float32 bricks_percent
end

schema GameState                # state schema
    Luminance(84, 336) pixels
end

curriculum high_score_curriculum
  train high_score
  with simulator breakout_simulator
  objective score
    lesson score_lesson
      configure
        constrain bricks_percent with Float32{1.0},
        constrain level with UInt16{1:100},
        constrain paddle_width with UInt8{1:4}
      until
        maximize score
end
```

The names in the configuration schema `BreakoutConfig` are the names referenced in the configure
clause of the lessons. When a lesson is initiated, the configuration data as described 
in the configuration schema is sent
to the simulator. The configuration data will be generated according to the
range expression in the lesson configure clause for a field. 

The second schema specified in the simulator clause is the `state` schema. It is
specified after the `state` keyword in the simulator clause. This is the schema
that defines what is sent to the lesson. Recall that a simulator has state. That
means that input to the lesson will consist of the state of the game as a result
of the previous lesson execution. For Breakout this schema is called
`GameState`. The `Luminance` field in `GameState` describes the state of play in
pixels. 

The simulator `state` schema
must match the schema associated with `input` for the system.
This reflects the fact that the state is the input to the simulator for 
selection of the next move.

```inkling--code
# predict schema for high_score and action schema for simulator
schema PlayerMove               # action schema
    Int8{-1, 0, 1} move         # these values describe game moves
end

concept high_score is classifier
  predicts (PlayerMove)
  follows keep_paddle_under_ball, input(GameState)
  feeds output
end
```

The `action` schema (which is `PlayerMove`) is the third schema specified in the simulator clause.
The simulator `action` schema must match the `predicts` schema of the concept being trained.
In our example the concept `high_score` trains the Brain to select the next move, which will have
one of the values specified in the `PlayerMove` schema range expression. 

```inkling--code
concept keep_paddle_under_ball is classifier
  predicts (PlayerMove)
  follows input(GameState)
end

curriculum keep_paddle_under_ball_curriculum
  train keep_paddle_under_ball
  with simulator breakout_simulator
  objective ball_paddle_distance
    lesson track_ball_any_paddle
      configure
        constrain bricks_percent with Float32{1.0},
        constrain level with UInt16{1:100},
        constrain paddle_width with UInt8{1:4}
      until
        maximize ball_paddle_closeness
    lesson track_ball_wide_paddle
      configure
        constrain bricks_percent with Float32{1.0},
        constrain level with UInt16{1:100},
        constrain paddle_width with UInt8{4}
      until
        maximize ball_paddle_closeness
end
```

One other concept which helps with playing Breakout is `keep_paddle_under_ball`.
In the curriculum for this concept, there are two lessons. One of the lessons,
`track_ball_any_paddle`, varies paddle width from 1 to 4. The other lesson, 
`track_ball_wide_paddle`, has a fixed paddle width of 4. In training this
concept, the fixed wide width paddle lesson is easier to train, and that one
would be trained first, resulting in faster and more effective training time
overall.  

