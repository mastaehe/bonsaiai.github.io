# Training Sources

The bonsai Platform supports training with both real and synthetic data. The `data`, `simulator` and `generator` keywords are used to describe what kind of training source you would like to use for training.

### Simulators

Simulators are interactive virtual environments. Every simulator has state, a representation of the world inside the virtual environment. This state almost always changes over time and in response to actions taken by an AI or other agent. The AI and the simulator are in a loop where a BRAIN is receiving a frame of state from the simulator, then the BRAIN is selecting a next action, next, the simulator changes state in response to the action. Then the BRAIN receives this new updated frame of state from the simulator. After receiving this new state from the simulator, the BRAIN picks a new next action, so on and so on until the BRAIN learns how to best operate the simulation.

Our [Library Reference][1] describes the classes and methods used to connect an existing simulator or create a new simulator in Python. [Find the Center][3] is an example of a basic simulator implementation.

Simulators are currently the only training source implemented.

### Generators

Generators produce labeled data programmatically. This data is effectively infinite. A generator could, for example, produce a random (but known) integer, set of line segments, etc.

### Data

Data is information related to the scenario being trained comprising of columns of information and the expected label or desired predicted value. Data is used both for training and evaluating the quality of training. Examples of training data include a collection of images and labels or the rows and columns of a spreadsheet.

<aside class="notice">
Currently, during our private beta, you can <b>only</b> train with simulators as your training source. That is, only the <i>simulator</i> training specifier is supported.
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

The [Mountain Car example][4] of a simulator below shows the implementation of this clause in a curriculum.

## Generator Clause Syntax

```inkling--syntax
generator <generatorName>'('<configurationSchema>')'  
  yield '('<outputSchema>')'    # generator output (yield)
end
```

Select the Syntax tab to see the Generator clause syntax.

When a generator is used for training, use the generator clause.

The keyword **generator** indicates that the simulator generates the training data. The
generator clause has a yield schema that defines the training output.

[1]: ./library-reference.html
[2]: http://yann.lecun.com/exdb/mnist/
[3]: ./../examples.html#find-the-center-example
[4]: #curriculum
