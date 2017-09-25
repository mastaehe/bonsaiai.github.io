# Curriculums

The keyword `curriculum` declares a set of lessons that are used to teach concepts. Each `curriculum` contains a `lesson` or set of lessons and trains a single `concept`.

A curriculum is used to teach a concept. The curriculum defines what concept is being taught. Every concept needs a corresponding curriculum to teach it. A curriculum defines a set of lessons used to train the concept.

> Curriculum (top level) Syntax

```inkling--syntax
curriculumStmt ::=
curriculum <name>
    train <conceptName>
[
  withClause                        # with clause

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

```inkling--code
curriculum curriculumName
  train conceptName
  with trainingSpecifier  # one of data, simulator, or generator
  objective objectiveName
    # lessons are specified here.
end
```

The `train` keyword indicates which concept this curriculum trains, the _with data_ keywords specify that training with labeled data should be used with this curriculum, and the _objective_ keyword specifies the objective function used to evaluate the learning system&#39;s performance.

Curricula contain one or more lessons which themselves form a directed graph for use by the instructor.

The _trainingSpecifier_ specifies either `data`, `simulator`, or `generator` as the training source. Refer back to [Training Source][2] for more information on what the differences are.

<aside class="notice">
Currently, only simulator training sources are supported. When the <i>trainingspecifier</i> is <b>simulator</b>, the objective names a function which is specified in the associated simulator. The use of simulators requires an auxiliary <i>simulator</i> clause. 
</aside>

The `objective` specifies the termination condition for training.



**(Previously there was a ### Rules section, do we want that?)**

There can be only one curriculum per concept.

Lessons, tests, and assignments can occur in any order.

The test clause is optional for any particular lesson. However if the last lesson has no test clause it is an error.

The `follows` clause on the lesson is optional. Note that if there is no `follows` clause and the lessons are executed in parallel, training will be slower.

If the usingClause is present (that is, if the simplified curriculum syntax is not being used), there must be one usingClause for every withClause.

---------> Current web rules section below

* One curriculum per concept. 
* Every concept must have a curriculum.
* Every simulator must be declared with a [simulator clause][3].
* Lessons and tests can occur in any order.
* If the **using** clause is present (that is, if the simplified curriculum syntax is not being used), there must be one **using** clause for every **with** clause.
* The objective is always required.

### Discussion

```inkling--syntax
curriculum <name>                              # single curriculum                    
train  <conceptName>                           # single concept   
[ 
  with simulator <simulatorName>  
  objective <objectiveFunctionName> 
]+ 
```

The architect hands the instructor a laid out concept graph. The instructor will look for starting point among the concepts and their corresponding curriculums. At the highest level the instructor will use the curriculum to train the concept; thus there is one curriculum per concept. Note how the curriculum syntax associates a curriculum with a single concept.

A curriculum (and its concept) is associated with a set of simulators and each simulator has an objective function and a schema. The instructor trains each concept using a simulator with a dedicated objective function. The schema used in the curriculum statement identifies placeholders. Placeholders are discussed in the [lessons][] section.

### Mountain Car Example

```inkling--code
simulator mountaincar_simulator(MountainCarConfig) 
  state (GameState)
  control (Action)
end
```

```inkling--code
curriculum high_score_curriculum
train high_score
with simulator mountaincar_simulator 
objective open_ai_gym_default_objective
  lesson get_high_score
    configure
      constrain episode_length with Int8{-1},
      constrain num_episodes with Int8{-1},
      constrain deque_size with UInt8{1}
    until
      maximize open_ai_gym_default_objective
end
```

Select the Inkling tab to view an excerpt of the code in the game Mountain Car from
OpenAI Gym as written in Inkling. This illustrates the [simulator clause][3].  (To explore this example more fully,
refer to it in our [Examples chapter][1].)

The simulator clause declares the simulator name and two schemas. The first specifies the schema for configuration of the simulator and it appears in parentheses immediately after the simulator name. In this instance, the configuration schema is named `MountainCarConfig`. In the example, the configure clause of lesson `get_high_score` initializes this configuration.

```inkling--code
# Configuration schema declaration
schema MountainCarConfig
  Int8 episode_length,
  Int8 num_episodes,
  UInt8 deque_size
end
```

The names in the configuration schema are the names referenced in the configure
clause of `lesson get_high_score`. When the lesson is
initiated, the configuration data as described in the configuration schema is sent
to the simulator. The configuration data will be generated according to the
range expression in the lesson configure clause for a field. 

The second schema specified in the simulator clause is the state schema. It is
specified after the **state** keyword in the simulator clause. This is the schema that defines what is sent to the lesson. Recall that a simulator has state. That means that input to the lesson will consist of the state of the game as a result of the previous lesson execution. For mountaincar this schema is called `GameState` and prior state consists of prior position.


```inkling--code
# State schema definition
schema GameState
  Float32 x_position,
  Float32 x_velocity
end
```

In order to determine what our next move will be, the training will use the previous position as input.

Finally, note that `high_score_curriculum` trains a concept called `high_score`.  (It's quite clear what we are aiming for with this curriculum!)


```inkling--code
# Predict schema Action (see concept high_score)
schema Action
  Int8{0, 1, 2} action # these values describe game moves
end

concept high_score
  is classifier
  predicts (Action)
  follows input(GameState)    
  feeds output
end
```

The concept `high_score` trains the Brain to select the next move, which will have
one of the values specified in the `Action` schema range expression. 

Note that the predefined stream **input** has the schema `GameState`. This reflects that fact that the simulator has state. The previous move is the state which is input into the selection of the next move.

The **predicts** schema `Action` also appears in the simulator clause discussed above. It is after the keyword **control**. In general the **control** schema is the **predicts** schema of the concept being trained.

So far we have presented a simple version of the curriculum. Inkling supports
multiple simulators and generators within a single curriculum. Here is the full
syntax for the curriculum statement, which introduces a **using** clause and a
**with** clause (where **using** and **with** will specify simulators). These were not needed in our example above because we were using a single simulator.


### Breakout Example

[This is what was in OneNote. Do we want to use this one or the Mountain Car example? We could use this one in the reference and just link to Mountain Car but it has more text around it to explain. Up to you.]

Here is a concept and its curriculum for training for the computer game breakout. It is simplified but shows the various Inkling statements and includes some code fragments for a python simulator.  Included are the curriculum, lessons,  concepts, schemas, and simulator. (This example uses compiler version 1.1.1 syntax.) 

As there is only one simulator, this example uses the simplified syntax where 'using <simulatorName>' is unnecessary.  

```inkling--code
simulator breakout_simulator(BreakoutConfig) 
   state (GameState) 
   action(PlayerMove) 
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
 
concept ball_location is estimator 
  predicts (Matrix(UInt32, 1, 2) location) 
  follows input(GameState) 
end 
concept keep_paddle_under_ball is classifier 
    predicts (PlayerMove) 
  follows ball_location, input(GameState) 
end 
concept high_score is classifier 
  predicts (PlayerMove) 
  follows keep_paddle_under_ball, input(GameState) 
  feeds output 
end 
 
curriculum ball_location_curriculum 
  train ball_location 
  with simulator breakout_simulator 
  objective ball_location_distance 
    lesson no_bricks 
      configure 
        constrain bricks_percent with Float32{0.0}, 
        constrain level with UInt32{1}, 
        constrain paddle_width with UInt8{4} 
      train 
        from frame in breakout_simulator 
        select frame 
        send frame 
      test 
        from frame in breakout_simulator 
        select frame 
        send frame 
      until 
        minimize ball_location_distance 
 
    lesson more_bricks follows no_bricks 
      configure 
        constrain bricks_percent with Float32{0.1:0.01:1.0}, 
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
        minimize ball_location_distance 
end 
 
curriculum keep_paddle_under_ball_curriculum 
  train keep_paddle_under_ball 
  with simulator breakout_simulator 
  objective ball_paddle_distance 
    lesson track_ball 
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
        minimize ball_paddle_distance 
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


## Curriculum Subclauses 

The curriculum statement has subclauses including the withClause and the lessonClause.

### With Clause

The set of withClauses specifies the set of simulators this curriculum will use. The usingClause associates a set of lessons with each simulator.  
 
There is a simplified syntax for the curriculum in which the usingClause is not necessary because the curriculum contains only one simulator.  

> With Clause Syntax

```inkling--syntax
curriculumStmt :=  
curriculum <name>                      
   train  <conceptName>    
   withClause 
   [                                                           
      assignClause       
      lessonClause 
   ]+ 
end   # curriculum
```

---------> Current web syntax

```inkling--syntax
withClause ::=
with simulator
  objective <objectiveFunctionName>
```

The withClause specifies the simulators.

[Can we get rid of data and generator and just keep simulator?]

The keyword **data** indicates that this is batch based training using labeled data. This is generally accompanied with the assignClause which specifies how to prepare the training data. The type of training is time invariant. Training will result in a classifier. In this case the training does not use coded simulators.

If the keyword **data** is not used the simulator or generator clause will define some schemas, which are described below.

The keyword **generator** indicates that the simulator generates the training data. Generators can be thought of as a stateless simulators. They do have coded simulators but the training output does not get fed back into simulator. The generator clause has a **yield** schema that defines the training output.

The keyword **simulator** indicates that the responses of the system to the training data will feed back into the training. Simulators are coded implementations of the lessons. They are time variant. A simulator coded for example in python keeps state and thus it will use deep-q learning. The simulator clause has a **state** schema that describes simulator state.

### Lesson Clause (link to lesson section)

The lessonClause and the assignClause are discussed in detail in their respective sections.

The lessonClause contains subclauses to configure the lesson and to describe training and objective. A lesson may also include a test subclause. For more information see the section on [lessons][].

The assign clause prepares the data for training. More information on the assignClause can be found in the section on [assignment][].

