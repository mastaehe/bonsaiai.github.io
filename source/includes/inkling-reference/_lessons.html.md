# Lessons

Lesson syntax and semantics can vary slightly depending on the [curriculum][2] training type. 
A curriculum specifies its training type by specifying that it trains with a
[simulator][3], with data, or with a generator. 

<aside class="notice">
Future support is expected for training with generators and with data, and those training types will be documented when the features are supported. 
</aside>

> Lesson Syntax

```inkling--syntax
lessonStatement ::=
  lesson <lessonName>
    followsClause?
    configureClause
    untilClause
```

The `lesson` declares an individual lesson for the concept being trained by the curriculum.  Lessons are contained within curriculum statements. A curriculum can contain multiple lessons.

Lessons provide control over the training of the mental model. They allow 
the training of the concept to be broken down into phases where each phase is implemented by a lesson.
Lessons allow the BRAIN to learn the concept in stages rather than all at once. 

### Usage

The `configure` and the `until` clauses are required.

Lessons can be ordered, using the `follows` clause. Note that this ordering is a suggestion to the instructor, not a hard and fast rule.  If there is no `follows` clause and the lessons are executed in parallel, training will be slower.

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

schema BreakoutConfig # configured in lesson configureClause
  Int32 level,
  Int8{1:4} paddle_width,
  Float32 bricks_percent
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

    lesson constant_breakout
      configure           # configure to constant values
        constrain bricks_percent with Float32{0.5},
        constrain level with Int32{1},    # e.g. level = 1
        constrain paddle_width with Int8{4}
      until
        maximize ball_location_distance

    lesson vary_breakout follows constant_breakout
      configure          # configure to type constraints
      constrain bricks_percent with Float32{0.1:0.01:1.0},
      constrain level with Int32{1:100}, # e.g. level varies from 1..100
      constrain paddle_width with Int8{1:4}
    until
      maximize ball_location_distance
end
```

In this example we show lessons that break into stages the task of playing
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

Schema declarations can also use type constraints. They are discussed in depth
[here][1].


## Lesson Subclauses

In this section we discuss the `follows` clause, the `configure` clause, and the `until` clause.

* Lessons can be ordered, using the `follows` clause. This will specify the order of lessons in training and can be more efficient.

* Lessons are configured, using the `configure` clause. This configures data for the lesson. 

* The `until` clause describes success for the objective function. 

###### Follows Clause

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
The `configure` clause has `constrain` subclauses that each specify a
placeholder for a field in the configuration schema. The placeholder specifies a
range of values for the field through [constrained types and range expressions][1].

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

The type `Int32 {1:10}` is called a [constrained type][1]. The syntax `{1:10}` is
called a [range expression][1].  These topics are discussed in depth in the Schema chapter. 

The field definition of `level` in schema `BreakoutConfig` is `Int32  level`.
In order to be a valid constraint, the placeholder definition for `level` must
conform to the field definition. This means the types must be identical.
Also the range expression on the placeholder must specify a subset of the values on
the field definition. If there is no range expression on the field definition,
the maximum range of values for the type is assumed, so any valid range
expression on the placeholder would be valid.

### Example

```inkling--code
schema BreakoutConfig 
  Int32  level,                     # 'level', 'paddle_width', 'bricks_percent' 
  Int8   paddle_width,              # are matched below in constrain clauses 
  Float32 bricks_percent 
end
 
curriculum keep_paddle_under_ball_curriculum 
  train keep_paddle_under_ball 
  with simulator breakout_sim(BreakoutConfig) 
  objective ball_paddle_distance 
 
    lesson track_ball 
      configure breakout_sim 
        constrain paddle_width  with Int8{1:10},
        constrain level with Int32{1:10}, 
        constrain bricks_percent with Float32{0.1:0.01:1.0}  
      until 
        maximize ball_paddle_distance 
end
```

The accompanying example gives an overview of configuration using these Inkling code fragments in the context of a curriculum.  The simulator in the curriculum uses the `BreakoutConfig` schema. Note how the field names and types in the simulator schema match up with the names and types of the placeholders in the constrain clauses. 

In this example we show how configuration works for `bricks_percent`.

The instructor selects values for `bricks_percent` from the given range. `Float32 {0.1:0.01:1.0}` is an Inkling specification for a constrained type. In a constrained type the values are all `Float32` but they also obey the constraint specified.

We can also configure `bricks_percent` to take a constant value:

 `constrain bricks_percent with Float32 {1.0}`

`Float32 {1.0}` is a Float32 constrained to take the value 1.0. This is the
value list form of the range expression. You can add values to the list as long as they are of the same type, so the following is also valid:

`constrain bricks_percent with Float32 {1.0, 1.5}`

###### Until Clause

> Until Clause Syntax

The `until` clause in the lesson specifies the termination condition for training.

<aside class="notice">
Currently, there may be issues with termination of lessons in series. If you intend to use multiple lessons in a curriculum please <a href="https://bons.ai/contact-us#contact-page-form">contact support</a> if you have issues with training.
</aside>

```inkling--syntax
untilClause ::=
until
      maximize <objectiveFunctionName>
    |
      <objectiveFunctionName> relOp constantExpression

relOp ::=
  '==' | '<' | '>' | '<=' | '>='
```


### Usage

The `until` clause is required.



### Example

There are several examples of the `until` clause above. They are excerpted in
the code panel.

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

[1]: #constrained-types-and-range-expressions
[2]: #curriculums
[3]: #simulators
