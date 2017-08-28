# Lessons

Lessons are contained within curriculums. For a specification of curriculums see [Curriculums][]. What clauses are required depends on the type of simulator (data, simulator, or generator). For a table with these rules see [Lesson Clauses Table][].

------> below is from the current web intro section

```inkling--code
lesson lessonName
    follows prevLessonName
  configureClause
  trainClause
  testClause
  untilClause
```

The `lesson` (keyword) declares an individual lesson for the concept being trained by the curriculum.  Lessons are contained within curriculum statements. A curriculum can contain multiple lessons.

Lessons give you control over the training of the mental model. They allow you to break down the training of the concept into phases where each phase is implemented by a lesson.

> Lesson Syntax

```inkling--syntax
lessonStatement ::=
  lesson <lessonName>
    [follows <lessonName>]?
    configureClause?
    trainClause?
    untilClause?
    testClause?
```

Lessons allow the machine to learn the concept in stages rather than all at
once. 

Here are the overall lesson rules:

* Lesson statements appear within curriculum statements.
* Lesson statements may contain the following keywords: `configure`, `train`, `test`, and `until`.
* Lessons appear after the objective clause in curriculums.
* Lessons can be ordered, using the `follows` clause. Note that this ordering is a suggestion to the instructor, not a hard and fast rule.

Lessons have `configure`, `test`, `train`, and `until` clauses. 
Some lesson clauses have defaults so if a clause is not specified the default
will be in effect. Also in certain circumstances not all clauses are available.
See the lesson clauses table in this chapter for the rules which apply to a specific
clause.

### Usage

------> below is from the current web "rules" section

* To summarize the table above, for a lesson associated with a _trainingSpecifier_ of `data`: one or both of the lesson clauses `train` and `test` are required (and there are no default versions of these clauses).
* The `test` clause is optional for any particular lesson. However if the last lesson has no `test` clause it is an error.
* The `follows` clause on the lesson is optional. If there is no `follows` clause and the lessons are executed in parallel, training will be slower.
* For a lesson associated with a _trainingSpecifier_ of `generator` or `simulator` if neither the `test` or `train` lesson clauses are present, defaults for both clauses are generated (See the [Lesson Clauses Table][] for default details). Otherwise, no defaults are generated.

### Dicussion

[Fill in or remove as needed.]

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
the game breakout. The first lesson, `constant_breakout`, trains the machine
with a set of fixed values as configuration parameters. The second lesson,
`vary_breakout`, which **follows** `constant_breakout`, trains the machine with a set of configuration parameters that vary according to specified type constraints.

The two lessons in our example, `constant_breakout` and `vary_breakout`, are different in their configure clause. The first sets the fields in the configuration schema to constant values and the second lesson, `vary_breakout`, generates sets of values constrained by the type constraint. 

Note that the **constrain** name in our example specifies a field in the
configuration schema for the simulator. These fields are `bricks_percent`,
`level`, and `paddle_width`. When such fields are initialized with values from a
type constraint they are often called **placeholders**.  This means that the name is is not the name of a specific value but rather it is the name of a range of values which will be input during training.

You can find more discussion of type constraint rules in the schema section. (Schema declarations can also use type constraints.)


## Lesson Subclauses

Lessons can be ordered, using the followsClause. This will specify the order of lessons in training and can be more efficient.

Lessons must be configured, using the configureClause. This configures data for the lesson. Other clauses may be optional, depending on whether this is a lesson for a simulator, generator or batched training with labeled data. That includes the trainClause, which describes training, and the untilClause, which describes success for the objective function. NOTE optional versus required is under specified.

The test clause is optional for any particular lesson. However if the last lesson has no test clause it is an error.

### Placeholder

Training uses placeholders. In the following configuration level is a placeholder name.

```inkling--code
constrain level with Int32{1:10}   # level is a placeholder name. 
```

It is not the name of a specific value but rather it is the name of a range of values which will be input by the instructor during training. In this context the type constrained by the range expression provides guidance to the instructor about training values.

The type `Int32 {1:10}` is called a constrained type. This syntax can also be used in schemas and is discussed in the section on [Constrained Types][]. Type constraints which are lists of values are also supported.

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

[Needs some general (not example specific) information about this clause.]


### Usage

A configure clause is required for the simulator and generator cases. Generally it is not used in the data case because labeled data should not be configured.

### Example

The example below gives an overview of configuration using the above Inkling code fragments in the context of a curriculum.  The simulator in the curriculum uses the `BreakoutConfig` schema. Note how the field names and types in the simulator schema match up with the names and types of the placeholders in the constrain clauses. This is required.

```inkling--code
schema BreakoutConfig 
( 
  UInt32  level,                     # 'level', 'paddle_width', 'bricks_percent' 
  UInt8   paddle_width,              # are matched below in constrain clauses 
  Float32 bricks_percent 
) 
 
curriculum keep_paddle_under_ball_curriculum 
  train keep_paddle_under_ball 
  with simulator breakout_sim(BreakoutConfig) 
  objective ball_paddle_distance 
 
    lesson track_ball 
      configure breakout_sim 
        let x = from item in datastore1(InputConfig) select item 
        constrain paddle_width  
            from paddle_width in  
               range(x.lower_bound, x.upper_bound, x.numsteps) 
            select paddle_width, 
        constrain level with Int32{1:10}, 
        constrain bricks_percent with Float32{0.1:0.01:1.0}  
      until 
        minimize ball_paddle_distance 
end
```

First I will show some examples of the `configureClause` for `bricks_percent`.  Note the schema reference associated with this simulator in the curriculum statement has a field called `bricks_percent` with a `Float32` type.

In this example the instructor selects values for `bricks_percent` from the given range. `Float32 {0.1:0.01:1.0}` is an Inkling specification for a constrained type. In a constrained type the values are all `Float32` but they also obey the constraint specified.

The `configureClause` supports placeholders. The `bricks_percent` name in this configuration is the name of a placeholder. A placeholder name is not a variable holding a specific value but rather it is the name of a range of values which will be input by the instructor during training. The configureClause provides guidance to the instructor as to how to configure for training but it is not like an assignment in an imperative language because it does not mean initialization to a unique value. In general the instructor has some degrees of freedom in determining how to configure for training.

Here is a configuration for bricks_percent for a different lesson. This example shows how you can configure it to take a constant value.

 `constrain bricks_percent with Float32 {1.0}`

`Float32 {1.0}` is a Float32 constrained to take the value 1.0. This is the valueList form of the range constraint. You can add values to the list as long as they are of the same type, so the following is also valid:

`constrain bricks_percent with Float32 {1.0, 1.5}`

###### Train and Test Clause

[Needs some general (not example specific) information about this clause.]

> Train and Test Clause Syntax

```inkling--syntax
trainClause ::=
train
  fromClause
  send <name>
trainingSpecifer

testClause ::=
test
  fromClause
  send <name>
trainingSpecifer
```

The `test` clause and the `train` clause have identical syntax except for
their keyword (train or test).  However they both vary depending on the
_trainingSpecifier_ in the curriculum. 

The `from` clause in the test/train syntax is used to name and describe the
training data that is sent by the simulator to the lesson.

### Usage

In the case of data, the train clause is required. In the case of simulator or generator, if the train clause is not present, the return schema of the simulator must exactly match the input schema to the network.

The test clause is not required for any particular lesson. But if the final lesson does not have a test clause that is an error.

### Example

This example shows a train clause with no `expect`. That is because the is a simulator with no labeled data.

```inkling--code
schema GameState 
    Luminance(48, 48) pixels 
end 
schema BreakoutConfig 
    UInt32 level, 
    UInt8{1:4} paddleWidth, 
    Float32 bricks_percent 
end 
 
concept ball_location : <Matrix(UInt32, 1, 2) location>  
  is estimator 
  follows input<GameState> 
 
curriculum ball_location_curriculum 
  train ball_location 
  with simulator breakout_sim 
   <Matrix(UInt32, 1, 2) location>  # input to sim is same as the output of the concept  
   : <GameState> # by default the schema assoc with the input keyword for the system 
  objective ball_location_distance 
 
# The train statement allows the programmer to use linq to 
# transform the output from the simulator before sending it on  
# to the mental model. In the case of simulators, there is no  
# “expect” as we don’t know what to expect from the neural network 
# (we know the type the system will output, but not the value) 
# configure schema is optional and it will be calculated from the  
# constraints. However is a linq statement (not constrain) is used 
# a schema is necessary (now, could be relaxed later).  
    lesson no_bricks 
      configure breakout_sim<BreakoutConfig> 
        constrain bricks_percent with Float32{0.0}, 
        constrain level with UInt32{1}, 
        constrain paddle_width with UInt8{4} 
      train 
        from frame in breakout_sim # GameState is the type of frame 
        select frame.pixels 
        send frame.pixels                         
      until 
        minimize ball_location_distance 
```

What is sent (via `send`) to the neural network as a result of the `train` must have the same schema as the system's input schema. In this case that is `GameState`.  Note that `GameState` is declared as the output schema of the simulator.

The trained statement will conform to the input schema of the system. The data that comes out of the lesson will always flow into the input keyword. The system is calculating a subgraph between the input and that node and that portion is involved in the training.

The curriculum represent a collection of lessons which train a subgraph of the mental model. The lesson represents a phase in training a subgraph of the mental model. The lessons represent the phases of training.

All subgraphs begin with input and end with the concept under training and contain all nodes in between.

For training with data, the trained statement will be a query.

For a simulator, the trained statement equals the simulator output.

For a generator, the trained statement equals some functions output. That function returns the input and the output

The trained statement can be understood as the input data to the trained network (or mental model).

It is the instructors responsibility to guide training by specifying which streams and concepts in the subgraph will be active in the training and to decide on the terminating condition. Transformd will execute any streams and stream operatons (linq statements) which are part of the subgraph.

The train clause is optional. If it is not present a default is generated which consists of a `from..select..send` that will send the simulator output, conforming to the simulator output schema, to the neural network. This is what is shown above.

###### Until Clause

> Until Clause Syntax

```inkling--syntax
untilClause ::=
until
      [ minimize | maximize ] <objectiveFunctionName>
    |
      <objectiveFunctionName> relOp constantExpression

relOp ::=
  '==' | '<' | '>' | '<=' | '>='
```

The `until` clause is required if the curriculum _trainingSpecifier_ is `simulator`. If it is not present, a default with value minimize will be created.

The `until` clause in the lesson specifies the termination condition for training.

### Usage

If this is data or a generator, the until clause is optional and if it is not present a default with value minimize will be created.

If this is a simulator the until clause is required.

### Example

There are several examples of the until clause above, including:

```inkling--code
     until 
        minimize ball_location_distance
```

This specifies that training should continue until the return value of the objective function is minimized. The keyword `maximize` can also be used. It is also possible to specify a constant expression, for example:

```inkling--code
     until 
        ball_location_distance == 7
```

## Lesson Clauses Table

[Is it possible to use the 5 column format currently on the web that doesn't run off the page?]

This table shows which lesson clauses are required and under what conditions.

|   | **objective** | **configure** | **train** | **test** | **until** |
| --- | --- | --- | --- | --- | --- |
| **data** | required, baked into platform only (equality, linear distance) | not allowed | must have train OR test at minimum. Defaults to none in protobuf. | must have train OR test at minimum, defaults to None | not allowed, defaults to: baked into the platform (minimize whatUserSpecified) |
| **generator** | required. | required | If neither train or test present, defaults to: from item in generator select item send item.image expects item.label | If neither train or test present, defaults to: from item in generator select item send item.image expect item.label.Generate default for every lesson. | not allowed, baked into the platform (minimize whatUserSpecified) |
| **simulator** | required, defined in the simulator | required | If neither train or test present, defaults to:  from item in simulator select item send item | If neither train or test present, defaults to: from item in simulator select item. Generate default for every lesson | required |

**Summary for train/test clauses:**

for `data`:

* one or both of `train` and `test` are required, else error.
* No defaults.

for `generator` and `simulator`:

- if neither `test` or `train` are present, default `test` and `train` are generated.
- if one or both are present, there are no defaults generated.

------> below is from the current web version

Lesson clauses have defaults so if a clause is not specified the default will be assumed. Also in certain circumstances not all clauses are available. This table specifies the rules. Recall that the _trainingSpecifier_ appears after the keyword **with** in the curriculum.

        training specifier       |     configure clause           |        train clause        |       test clause         |      until clause          
-------------- | -------------- | -------------- | -------------- | -------------- 
**data**      | Not allowed. | Must have train or test at a minimum. Defaults to none.| Must have train or test at a mininum. Defaults to none. | Not user specified. Will default to: *minimize objectiveName*.
**generator** | Required.    | If neither train nor test is present, defaults to: *from item in generator select item send item.image expects item.label*. | If neither train nor test is present, defaults to: *from item in generator select item send item.image expect item.label*. If not present, generate default for every lesson. | Not user specified. Will default to: *minimize objectiveName*.
**simulator** | Required.    | If neither train nor test is present, defaults to: *item in simulator select item send item*. | If neither train nor test is present, defaults to: *from item in simulator select item*. If not present, generate default for every lesson. | Required.

<aside class="notice">
Currently, during the Bonsai Platform preview, you can only use simulators as your training source.
</aside> 



[1]:
