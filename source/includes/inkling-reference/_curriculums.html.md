# Curriculum

Reference for the keyword **curriculum**. Also, describes the keywords: **train**, **with**

### What is it?

The **curriculum** (keyword) declares a set of lessons that are used to teach concepts. Each curriculum contains a lesson or set of lessons and trains a single concept.

### Why do I use it?

A curriculum is used to teach a concept. The curriculum defines what concept is being taught. Every concept needs a corresponding curriculum to teach it. A curriculum defines a set of lessons used to train the concept.

### How do I use it?

```inkling--code
curriculum curriculumName
  train conceptName
  with trainingSpecifier  # one of data, simulator, or generator
  objective objectiveName
    # lessons are specified here.
end
```

Select the Inkling tab to see a simple form of a curriculum statement.

The _trainingSpecifier_ specifies either `data`, `simulator`, or `generator` as the training source. Refer back to [Training Source][2] for more information on what the differences are.

<aside class="notice">
Currently, only simulator training sources are supported. When the <i>trainingspecifier</i> is <b>simulator</b>, the objective names a function which is specified in the associated simulator. The use of simulators requires an auxiliary <i>simulator</i> clause. 
</aside>

The `objective` specifies the termination condition for training.

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

## Curriculum Rules

* One curriculum per concept. 
* Every concept must have a curriculum.
* Every simulator must be declared with a [simulator clause][3].
* Lessons and tests can occur in any order.
* If the **using** clause is present (that is, if the simplified curriculum syntax is not being used), there must be one **using** clause for every **with** clause.
* The objective is always required.

[//]: # (Assignments are used for data handling when the training specifier is **data**.)


## Curriculum Statement Syntax

```inkling--syntax
curriculumStatement ::=
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

```inkling--syntax
withClause ::=
with simulator
  objective <objectiveFunctionName>
```

Select the Syntax tab to see the Curriculum syntax.

Any simulator referenced in a curriculum must have an associated simulator clause, outlined in [Training Source][2].

[//]: # (Reinsert data example when it is a training source option.)

[1]: ./../examples.html#mountain-car-example
[2]: #training-source
[3]: #simulator-clause-syntax