# Curriculum

Reference for the keyword **curriculum**. Also, describes the keywords: **train**, **with**, **data**

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
When the <i>trainingSpecifier</i> is <b>data</b>, the objective must be either the keywords <i>equality</i> or <i>linear_distance</i>. When the training specifier is <b>simulator</b> or <b>generator</b>, the objective names a function which is specified in the associated simulator or generator. The use of simulators or generators requires an auxiliary clause, the <i>simulator</i> or <i>generator</i> clause respectively. 
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
* You can train with **data**, **simulators**, or **generators**. These are the values allowed as training specifiers (see the Curriculum syntax). 
* Every simulator must be declared with a [simulator clause][3].
* Lessons, tests, and assignments can occur in any order. (Assignments are used for data handling when the training specifier is **data**.)
* If the **using** clause is present (that is, if the simplified curriculum syntax is not being used), there must be one **using** clause for every **with** clause.
* The objective is always required but if the _trainingSpecifier_ is **data**, the objective must be either `equality` or `linear_distance`.

## Curriculum Statement Syntax

```inkling--syntax
curriculumStatement ::=
curriculum <name>
    train <conceptName>
[
  withClause                        # with clause

]+
[
  using  [ <simulatorName> | data ] # using clause
  [
    assignClause # assignment for training and test data
    lessonClause # lesson set for this simulator
  ]+

  end # using
]+
end # curriculum
```

```inkling--syntax
withClause ::=
with data
  objective <objectiveFunctionName>

| with simulator
  objective <objectiveFunctionName>

| with generator
  objective <objectiveFunctionName>
```

Select the Syntax tab to see the Curriculum syntax.

Any simulator or generator referenced in a curriculum must have an associated simulator or generator clause, outlined in [Training Source][2].

## Curriculum Examples

Select the Inkling tab to see the Inkling code.

```inkling--code
curriculum get_high_score_curriculum
  train get_high_score
  with simulator breakout_simulator
  objective score
    # lessons listed here
end
```

### get_high_score_curriculum
‍
This curriculum will train the concept `get_high_score`.
In this example:

* **curriculumName:** get_high_score_curriculum
* **conceptName:** get_high_score
* **trainingSpecifier:** simulator
* **simulator** the keyword to indicate that this is training on a simulator
* **simulatorName**: breakout_simulator
* **objectiveName:** score

### digit_curriculum

```inkling--code
from utils import split

schema MNIST_schema
  String text,
  Luminance(28, 28) image
end

# Here the MNIST labeled data set is brought into Inkling:

datastore MNIST_data(MNIST_schema)
copy "mnist-training.csv" into MNIST_data with format = "csv"

# Training 'with data'
curriculum digit_curriculum
  train Digit
  with data
  objective equality  
  training_data, test_data = split(MNIST_data, 0.8, shuffle=True)
    # lessons specified here
end
```

This curriculum trains the `Digit` concept. 

This example references the MNIST database which is used to train for
recognition of handwritten digits.  This example shows the use of the **data**
training specifier (which is not supported during private beta) for that data
set. When training **with data** the labeled data set must be read in from a
file and then prepared and split into training and test partitions. That is
shown in the Inkling code for digit_curriculum.

In this example:

* **curriculumName:** digit_curriculum
* **conceptName:** Digit
* **trainingSpecifier:** data
* **objectiveName:** equality
* **assignment**:
* **training_data:** variable name for subset of data portioned aside for training.
* **test_data:** variable name for subset of data portioned aside for testing.
* '**=**': represents the assignment of the result of the split function to the two variable names.
* **split function:** splits the data and labels it.
* **MNIST_data:** the data set used for training and testing.
* **0.8:** the amount to split the data by. 80% of the data goes to training. The remaining data (20%) goes to testing.
* **shuffle=True:** sets the shuffle parameter to true.

[1]: ./../examples.html#mountain-car-example
[2]: #training-source
[3]: #simulator-clause-syntax