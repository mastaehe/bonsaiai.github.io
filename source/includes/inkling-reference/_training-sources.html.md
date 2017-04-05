# Training Sources

The Bonsai Platform supports either `data`, `simulator`, or `generator` as your training source. These support different approaches to training.

### Simulators

Simulators are often a complex, interactive virtual environment. They usually have state, which is a representation of the world inside the virtual environment. In this case, all the data is unlabeled and the response to training data will be fed back into the training. A separately coded simulator (written in python for example) provides implementations of the lessons and keep the state of training.

Our [Library Reference][1] outlines the tools provided for creating your own simulator, currently only in python, and the [Find the Center][3] is an example of a basic simulator implementation.

This is currently the only training source implemented.

### Generators

Generators produce labeled data programmatically. This data is effectively infinite. A generator could, for example, produce a random (but known) integer, set of line segments, etc. This case is like the simulator case (in that there is a separately coded generator and the data is unlabeled), but the generator is stateless.

### Data

Data is information related to the scenario being trained and can also be used to test and evaluate how well the training is implemented. Data could be a collection of images and labels or the rows of a spreadsheet.

An example of a data set you could train with is the [MNIST database][2], which is a collection of handwritten digits used for training image processing systems and other machine learning systems.

A set of labeled data is another example of a data source available for training and testing. A labeled dataset contains data plus meta information about the data, for example an image of a hat plus the category of the image ('hat'). The labels assist training and also support testing. The availability of labeled data means that coded simulators are unnecessary. After training with the labeled data of images of hats, the BRAIN is able to identify a hat in an unlabeled image.

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

The keyword **simulator** indicates that the responses of the system to the training
data will feed back into the training. Simulators are coded implementations of
the lessons. They are time variant. A simulator coded for example in python
keeps state and thus it will use deep-q learning. The simulator clause has a
state schema that describes simulator state.

The [Mountain Car example][4] of a simulator below shows the implementation of this clause in a curriculum.

## Generator Clause Syntax

```inkling--syntax
generator <generatorName>'('<configurationSchema>')'  
  yield '('<outputSchema>')'    # generator output (yield)
end
```

Select the Syntax tab to see the Generator clause syntax.

When a generator is used for training, use the generator clause.

The keyword **generator** indicates that the simulator generates the training data.
Generators can be thought of as stateless simulators. They do have coded
simulators but the training output does not get fed back into simulator. The
generator clause has a yield schema that defines the training output.

[1]: ./library-reference.html
[2]: http://yann.lecun.com/exdb/mnist/
[3]: ./../examples.html#find-the-center-example
[4]: #curriculum
