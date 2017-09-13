# Lessons

Lesson syntax and semantics can vary slightly depending on the curriculum training type. 
A curriculum specifies its training type by specifying that it trains with a
simulator, with data, or with a generator. 

This section presents the lesson syntax and semantics for
curriculums which specify training with simulators only. Future support is expected for training with
generators and with data, and those training types will be documented when
the features are supported. 

The `lesson` declares an individual lesson for the concept being trained by the curriculum.  Lessons are contained within curriculum statements. A curriculum can contain multiple lessons.

Lessons provide control over the training of the mental model. They allow 
the training of the concept to be broken down into phases where each phase is implemented by a lesson.
Lessons allow the machine to learn the concept in stages rather than all at once. 

> Lesson Syntax

```inkling--syntax
lessonStatement ::=
  lesson <lessonName>
    followsClause?
    configureClause
    trainClause?
    testClause?
    untilClause
```

### Usage

The `configure` and the `until` clauses are required. 

The `train` and `test` clauses are optional.

Lessons can be ordered, using the `follows` clause. Note that this ordering is a suggestion to the instructor, not a hard and fast rule.  If there is no `follows` clause and the lessons are executed in parallel, training will be slower.

### Example

```inkling--code
schema BreakoutConfig   # configured in lesson configureClause
  UInt32 level,
  UInt8{1:4} paddle_width,
  Float32 bricks_percent
end

curriculum ball_location_curriculum
  train ball_location
  with simulator breakout_simulator
  objective ball_location_distance

    lesson constant_breakout
      configure           # configure to constant values
        constrain bricks_percent with Float32{0.5},
        constrain level with UInt32{1},    # e.g. level = 1
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

    lesson vary_breakout follows constant_breakout
      configure          # configure to type constraints
      constrain bricks_percent with Float32{0.1:0.01:1.0},
      constrain level with UInt32{1:100}, # e.g. level varies from 1..100
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
```

In this example we show lessons that break into stages the task of  playing
the game breakout. 

* The first lesson, `constant_breakout`, trains the machine
with a set of fixed values as configuration parameters. 
* The second lesson,
`vary_breakout`, which follows `constant_breakout`, trains the machine with a set of configuration parameters that vary according to specified type constraints.

The two lessons in our example, `constant_breakout` and `vary_breakout`, are different in their configure clause. The first sets the fields in the configuration schema to constant values and the second lesson, `vary_breakout`, generates sets of values constrained by the type constraint. 

Note that the identifiers specified after the `constrain` keyword in our example
specify fields in the
configuration schema for the simulator. These fields are `bricks_percent`,
`level`, and `paddle_width`. When such fields are initialized with values from a
type constraint they are called *placeholders*.  This means that the name is is not the name of a specific value but rather it is the name of a range of values which will be input during training.

You can find more discussion of type constraint rules in the schema section. (Schema declarations can also use type constraints.)


## Lesson Subclauses

In this section we discuss the `follows` clause, the `configure` clause, the
`test` and `train` clause, and the `until` clause.

* Lessons can be ordered, using the `follows` clause. This will specify the order of lessons in training and can be more efficient.

* Lessons are configured, using the `configure` clause. This configures data for the lesson. 

* The `test` and `train` clauses describe testing and training, and are optional. 
Note that whereas the `test` clause is optional for any particular lesson, if
the last lesson has no `test` clause it is an error.

* The `until` clause describes success for the objective function. 

###### Follows clause

> Follows Clause Syntax

```inkling--syntax
lesson <lessonName>
   followsClause?

followsClause ::=
follows 
    lessonName [ ',' lessonName]* 
```

The `follows` clause 
can be used to order lessons. Note that this ordering is a suggestion to the instructor, not a hard and fast rule.  If there is no `follows` clause and the lessons are executed in parallel, training will be slower.

### Usage

The `follows` clause is optional.

###### Configure Clause

> Configure Clause Syntax

```inkling--syntax
configureClause ::=
configure
    [ constrainClause [ ',' constrainClause]* ]*

constrainClause := 
constrain <schemaFieldName> with  
 
    ( constrainedType )
```

The `configure` clause function is to configure data for training and testing.

### Usage

A `configure` clause is required.

### Placeholder

The constraints in the `configure` clause configure the fields in the
configuration schema for the simulator. These fields are called placeholders. In the accompanying
example `level` is a placeholder. It is also a field in the configuration schema. 

```inkling--code
constrain level with Int32{1:10}   # level is a placeholder name. 
```

A placeholder is not the name of a specific value but rather it is the name
associated with a set of possible values which will be input by the instructor
during training. The characteristics of this set are specified in the
constraint. In this case, the values will be integers between 1 and 10. Note
there is no assumption of order. The instructor will randomly choose members
from this set. 

The type `Int32 {1:10}` is called a constrained type. The syntax `{1:10}` is
called a range expression.  These topics are discussed in depth in the Schema chapter. 


### Example

The accompanying example gives an overview of configuration using these Inkling code fragments in the context of a curriculum.  The simulator in the curriculum uses the `BreakoutConfig` schema. Note how the field names and types in the simulator schema match up with the names and types of the placeholders in the constrain clauses. 

```inkling--code
schema BreakoutConfig 
  UInt32  level,                     # 'level', 'paddle_width', 'bricks_percent' 
  UInt8   paddle_width,              # are matched below in constrain clauses 
  Float32 bricks_percent 
end
 
curriculum keep_paddle_under_ball_curriculum 
  train keep_paddle_under_ball 
  with simulator breakout_sim(BreakoutConfig) 
  objective ball_paddle_distance 
 
    lesson track_ball 
      configure breakout_sim 
        constrain paddle_width  with UInt8{1:10},
        constrain level with UInt32{1:10}, 
        constrain bricks_percent with Float32{0.1:0.01:1.0}  
      until 
        maximize ball_paddle_distance 
end
```

In this example we show how configuration works for `bricks_percent`.

The instructor selects values for `bricks_percent` from the given range. `Float32 {0.1:0.01:1.0}` is an Inkling specification for a constrained type. In a constrained type the values are all `Float32` but they also obey the constraint specified.

We can also configure `bricks_percent` to take a constant value:

 `constrain bricks_percent with Float32 {1.0}`

`Float32 {1.0}` is a Float32 constrained to take the value 1.0. This is the
value list form of the range expression. You can add values to the list as long as they are of the same type, so the following is also valid:

`constrain bricks_percent with Float32 {1.0, 1.5}`

###### Train and Test Clause

The `test` and `train` clauses describe testing and training.

The `from` subclause in the test/train syntax is used to name, describe, and select the
training data that is sent by the simulator to the lesson.

The `test` clause and the `train` clause have identical syntax except for
their keyword (`train` or `test`).  

> Train and Test Clause Syntax

```inkling--syntax
trainClause ::=
train
  from <item_name> in <simulator_name>
  select <item_name>
  send <item_name>

testClause ::=
test
  from <item_name> in <simulator_name>
  select <item_name>
  send <item_name>
```

### Usage

The `test` and `train` clauses are optional. 

If neither the `test` or `train` lesson clauses are present, defaults for both
clauses are generated. The default in both cases is:

`from item in <simulator_name> select item send item`

(Here `<simulator_name>` refers to the name of the simulator being used by the
lesson.)

If one of the `train` and `test` clauses is present, no defaults are generated.

If the `train` clause is not present, the return schema of the simulator must exactly match the input schema to the network.

The `test` clause is not required for any particular lesson. But if the final lesson does not have a `test` clause that is an error.

### Example

In this example we show `train` and `test` clauses. 
 
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
  follows keep_paddle_under_ball, input(GameState)
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

What is sent (via `send`) to the neural network as a result of the `train` must have the same schema as the system's input schema. In this case that is `GameState`.  Note that `GameState` is declared as the output schema of the simulator.

The data that comes out of the lesson will always flow into the input keyword.
The system is calculating a subgraph between the input and the concept being
trained and that portion of the mental model is involved in the training.

The curriculum represents a collection of lessons which collectively train a subgraph of the mental model. The lesson represents a phase in training a subgraph of the mental model. The lessons represent the phases of training.

All subgraphs begin with input and end with the concept under training and contain all nodes in between.

For training with a simulator, the trained statement equals the simulator output.

The trained statement can be understood as the input data to the trained network (or mental model).

The `train` clause is optional. If it is not present a default is generated that
will send the simulator output (conforming to the simulator output schema) to the neural network. 

###### Until Clause

> Until Clause Syntax

The `until` clause in the lesson specifies the termination condition for training.

```inkling--syntax
untilClause ::=
until
      [ minimize | maximize ] <objectiveFunctionName>
    |
      <objectiveFunctionName> relOp constantExpression

relOp ::=
  '==' | '<' | '>' | '<=' | '>='
```

Future support of the `until` clause will include `minimize` and constant
expressions. Current support is limited to `maximize`.

### Usage

The `until` clause is required.

### Example

There are several examples of the `until` clause above, including:

```inkling--code
      until 
        maximize ball_paddle_distance 
```


```inkling--code
      until
        maximize score
```

These both specify that training should continue until the return value of the
objective function is maximized. 

