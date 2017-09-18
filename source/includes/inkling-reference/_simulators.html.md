# Training Source

The Bonsai Platform supports training with both real and synthetic data. The `data`, `simulator` and `generator` keywords are used to describe what kind of training source you would like to use for training.

<aside class="notice">
Currently, during the Bonsai Platform preview, you can <b>only</b> train with simulators as your training source. That is, only the <i>simulator</i> training specifier is supported.
</aside>

### Simulators

Simulators are interactive virtual environments. Every simulator has state, a representation of the world inside the virtual environment. This state almost always changes over time and in response to actions taken by an AI or other agent. The AI and the simulator are in a loop where a BRAIN is receiving a frame of state from the simulator, then, the BRAIN is selecting a next action. Next, the simulator changes state in response to that action. The BRAIN then receives this new updated frame of state from the simulator and selects a new next action, so on and so on until the BRAIN learns how to best operate the simulation.

Our [Library Reference][1] describes the classes and methods used to connect an existing simulator or create a new simulator in Python. [Find the Center][2] is an example of a basic simulator implementation.

### Generators

Generators produce labeled data programmatically. This data is effectively infinite. A generator could, for example, produce a random (but known) integer, set of line segments, etc.

<aside class="notice">
Currently, during the Bonsai Platform preview, you can <b>only</b> train with simulators as your training source. That is <i>generators</i> are not supported.
</aside>

### Data

Data is information related to the scenario being trained comprising of columns of information with input values and expected labels or desired predicted values. Data is used both for training and evaluating the quality of training. Examples of training data include a collection of images and labels or the rows and columns of a spreadsheet.

<aside class="notice">
Currently, during the Bonsai Platform preview, you can <b>only</b> train with simulators as your training source. That is <i>data</i> is not supported.
</aside>

## Simulator Clause Syntax

```inkling--syntax
simulator <simulatorName>'('<configurationSchema>')' 
  state '('<stateSchema>')'     # simulator state
  control '('<controlSchema>')' # training concept predicts schema
end
```

Select the Syntax tab to see the Simulator clause syntax.

When a simulator is used for training, use the simulator clause. It is **required** to pass a <configurationSchema> into the simulator, even if the configuration is empty.

The [Mountain Car example][3] of a simulator shows the implementation of this clause in a curriculum.

[1]: ./library-reference.html
[2]: ./../examples.html#find-the-center-example
[3]: #curriculum
