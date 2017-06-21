# Concepts

The `concept` keyword declares an abstract concept that is to be learned by the system. Ultimately, this takes the form of a transformation of data, but no information need be provided about how to perform the calculation. By declaring a concept, you are instructing the BRAIN server that this is a node in the basic recurrent artificial intelligence network that must be learned. Consequently, concept nodes must have corresponding curricula to teach them.

Because concepts are learned, their declarations tend to be fairly simple unless one wants to explicitly tell the BRAIN server what learning algorithms and architecture to use (which is an unusual case).  A typical statement will look something like this:

```inkling--code
concept AbstractConceptName
  is classifier
  predicts ConceptSchema
  follows Antecedent1, Antecedent2      // 'follows' concept, block, or stream
  feeds Dependent1                      // 'feeds' concept, block, or stream
end
```

The `follows` and `feeds` keywords establish connectivity in the BRAIN directed graph in the same way that the `from` and `into` keywords do in stream declarations. The `is` keyword specifies the overall class of concept that is being modeled. For example, a classifier will learn to identify a label corresponding to its input, an estimator will learn to predict a value, a predictor will learn sequences and predict subsequent items in a sequence, etcetera.

------> from web

Reference for the keyword **concept**. Also, describes the keywords: **predicts**, **input**, **output**, **is**, **follows**, **end**, and **feeds**.

* `concept`: (the keyword) declares an abstract concept for the system to learn.
* `is`: specifies the kind of prediction the trained concept will produce (**classifier** or **estimator**).
* `predicts`: declares the concept's output.
* `follows`: declares the concepts or streams the concept gets input from.
* `feeds`: declares the list of concepts and streams that have this concept's output as input.
* `end`: delimiter that declares the end of this statement.

A concept statement describes what the computer will learn. It can be a feature (such as a curvy line in an image) or a goal (such as high score in a game).

> Concept Syntax

```inkling--syntax
conceptStatement :=
concept
  is [ classifier | estimator ]
  predicts ( schemaRef )
  [
    follows
      inputSource [',' inputSource ]*
    ]?
  [
    feeds
      outputTarget [',' outputTarget ]*

  ]?
end

inputSource ::=
    input '(' schemaRef? ')' | <name>     # name of a concept or stream

outputTarget ::=
    output |  <name>                      # name of a concept or stream
```

### Usage

Each instance of the `input` keyword must have a schema. 

This schema is required but it can be anonymous. The `output` keyword must not have a schema. 

The concept must declare an output schema after `predicts` keyword. This schema is required but it can be anonymous.

The `is` clause characterizes output. The `is classifier` form specifies that the output is an enum. 

------> from web

* The concept must be named after the `concept` keyword.
* The `is` keyword specifies the kind of prediction the trained concept will produce. For example, a concept can specify is classifier. This means that the trained concept will categorize its input. Email, for example, can be classified as spam or not spam. Another option with this keyword is estimator.
* The concept must declare an output schema after `predicts`. The output schema describes the data produced by the trained concept. For example if this concept classifies email into spam and not spam, the output schema for the concept would be a Bool. The output schema can be a named schema, where the name refers to a full schema definition elsewhere, or it can be anonymous, which is a parenthesized list of name, type pairs. See the section on schema declarations for more information.
* A trained concept gets input from streams or (if multiple concepts are used) from another concept. Input (the keyword) refers to the stream that is the original input to the system. All data flowing through the system has a schema associated with it. In some cases this is calculated rather than explicit.
* If the `input` keyword appears in the `follows` list, it means that the input stream flowing into this concept comes from outside the BRAIN. The `input` keyword must always be accompanied by a schema (named or anonymous) because the data stream originates outside the Brain; if no schema was present, data types and formats being input would be unknown.
* The `feeds` list is a list of concepts and streams (including the predefined output stream) for which this concept's output is a source.
* The `input` keyword cannot not appear in the feeds list and the `output` keyword cannot appear in the follows list.
* The concept statement is terminated by the `end` keyword.

### Discussion

Concept input can come from a stream or another concept. (Blocks will be supported later.)

When input comes from a concept, the type of the input doesn't matter. This is because concepts don’t act on normal data science data structures. The concept input is a matrix which has no type. 

Concepts do care about their input types when input comes from a stream. This is because the input needs to go through an encoder to become a tensor and the encoder must know the input types. In this case the input types are defined by the output schema of the stream feeding the concept. 

The 'predicts' output of a concept is also a matrix which has no type (a tensor). The function of the 'predicts' output schema is to select a decoder for that output matrix. This output schema decodes concepts. The decoding is used for debugging and also as hints for training. However note that it is advisable to avoid collapsing arbitrary encodings to CS values because it's a loss of  info - it's a compression of data. In general concepts feeding concepts (with no intervening stream) results in better learning (because when concepts feed concepts they are not collapsed). 

### Example(s)

------> from web

**get_high_score**

```inkling--code
concept get_high_score
  is classifier
  predicts PlayerMove
  follows input(GameState)
  feeds output
end
```

We show Inkling for the concepts get_high_score, Digit, Curvature, and Segments. 

Select the Inkling tab to display the Inklng source. 

In this example:

* `conceptName`: get_high_score
* `class`: classifier
* `predicts`: PlayerMove
* `input(schemaName)`: input(GameState)
* `dependent`: output


**Digit**

```inkling--code
concept Digit
  is classifier
  predicts MNIST_output
  follows Curvature, Segments, input(MNIST_input)
end
```

* `conceptName`: Digit
* `kind`: classifier
* `predicts`: MNIST_output
* `follows`
* `Curvature`: a concept
* `Segments`: another concept
* `input(MNIST_input)`: The `input` keyword indicates the predefined input    stream with data formats defined by schema MNIST_input.
* `feeds:` output

**Curvature**

```inkling--code
concept Curvature
  is classifier
  predicts (curve_output)
  follows input(MNIST_input)
end
```

* `conceptName`: Curvature
* `kind`: classifier
* `predicts`: curve_output
* `follows`:
* `input(MNIST_input)`: The `input` keyword indicates the predefined input    stream with data formats defined by schema MNIST_input.

**Segments**

```inkling--code
concept Segments
  is classifier
  predicts (segments_output)
  follows input(MNIST_input)
end
```

* `conceptName`: Segments
* `kind`: classifier
* `predicts`: segments_output
* `follows`:
* `input(MNIST_input)`: The `input` keyword indicates the predefined input    stream with data formats defined by schema MNIST_input.
