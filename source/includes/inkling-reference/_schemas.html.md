# Schemas

A schema describes a record and its fields. Schemas can be referenced by name. Statements (such as stream) can also use anonymous schemas. Schemas can be declared and referenced.

------> from web

This is the reference for the keyword **schema**. Also covered are the
definitions and uses of Inkling types, including type constraints.  These are used in schema declarations.

In Inkling a **schema** describes a named record and its contained fields. Each field in a schema has a name and a type. A field may also have a type constraint that constrains the values that the datum described by this field will take.

Schemas describe the structure of data in Inkling  streams, such as the
predefined `input` and `output` streams. In addition, many Inkling statements (for
example `concept` and `curriculum`) use schema references to describe the data that flows in and out of the construct.


## Schema Declarations

[Insert text here for introduction]

> Schema Declaration Syntax

```inkling--syntax
schemaStmt := 
schema <name>                      
     fieldDclnList 
end

fieldDclnList   :=  fieldDcln [',' fieldDcln  ]*  

fieldDcln       :=  scalarDcln   | structureDcln 

scalarDcln      :=  concreteType   rangeExpression? <name>
                                           
structureDcln   :=  structure_type   structure_init <name> 
                                
structure_type  :=  Luminance | Matrix | Vector

structure_init  :=  '(' 
                        luminance_init | matrix_init | vector_init
                    ')'

luminance_init  :=  integerLiteral  ',' integerLiteral 

matrix_init     :=  '(' concreteType [ ',' concretetype ]* ')' 
                        ',' integerLiteral [ ',' integerLiteral]* 

vector_init     :=  concreteType   rangeExpression? ','  integerLiteral 
```

In the syntax you will see references to Inkling primitive types and structure types
(Luminance, Matrix). These are discussed in in the Inkling Types section. 

### Usage

The set of concrete types includes the integer and string types, floats, etc. See the [Concrete Types][] section for the set of Inkling concrete types.

The structureDcln is intended to support common ML types. The ML types currently supported includes `Luminance` and `Matrix`. See [Machine Learning Types][]. 

In the matrix_init expression, a parenthesized list of types is followed by a list of dimensions. The number of types and the number of dimensions must match.

The schema rule allows both scalar and structure types to be arrays. The array size must be an integral constant.  

------> from web

* Inkling statements can reference schemas by name. Above, `MyConcept` uses `MySchema` as its `predicts` schema.
* Statements can use anonymous schemas. That means that a list of fields appears where a schema name could appear. Above, after `follows`, the predefined stream `input` has an anonymous schema with one field. This is useful in cases where you will only need that information once. In general, anywhere a schema name can appear, an anonymous schema can appear.
* The set of types supported with schema fields consists of the set of Inkling primitive types and the set of Inkling structured types. These sets are specified in the [Inkling Types][3] section.
* A schema field that has a primitive type can also have a type constraint that constrains the set of potential values for that field. Examples and syntax of type constraints are included in this chapter.


### Discussion

[Insert discussion text here]

### Example(s)

```inkling--code
  schema MNIST_schema
    String label, 
    Luminance(28, 28) image
  end

  schema my_schema
    Int32 x, 
    Int32{1:5} z 
  end
  
  stream foo from item in input(my_schema) select item.x, item.z 
```
  
Note item in the above stream statement corresponds to a record declaration in a Linq statement. It is dereferenced in the select to access the fields but it does not appear in the schema itself. 

The last field `z` in `my_schema` has constrained type `Int32{1:5}`. For more information on this feature see [Constrained Types[].



## Schema References

[Insert text here for introduction]

> Schema Reference Syntax

```inkling--syntax
schemaRef :=                 
     '('   ')'                  // empty anonymous schema
 |   '(' <name> ')'             // named schema
 |   '('  <fieldDclnList> ')    // non-empty anonymous schema
```

### Discussion

Schemas can be empty. Here is an empty (null) schema. 

`from item in input() select "something"`
  
Here is an anonymous schema. The schema does not have a name though it does have named fields.

`from item in input(Int32 x, Int32 y) select item.y`

Schemas tell the learning backend how to translate big matrices to usable values.
Note the inkling compiler does not enforce the schema, it is the streaming demon which enforces the schema. However the inkling compiler performs static checks to verify that the schemas are valid in the context in which they are used.

### Example(s)

[Insert Example and text here]



## Types

[Insert introduction text here]

###### Primitive Types

> Primitive Type Syntax

```inkling--syntax
primitiveType ::=
  Double | Float64 | Float32 | Int8 | Int16 | Int32 |
  Int64 | UInt8 | UInt16 | UInt32  | UInt64 | Bool | String
```

This shows a set of primitive types which are used in schema declarations. The
integer suffix indicates the size in bits of the type. Integer types beginning
with 'U' are unsigned. 

###### Structured Types

> Structured Type Syntax

```inkling--syntax
structure_type ::= 
  Luminance | Matrix
```

Inkling currently supports the types Matrix and Luminance. (This list will be
expanded.)

### Example(s)

[Insert Example and text here]

###### Constrained Types and Range Expressions

[Insert introduction text here]

Constrained types are supported in schemas and in lesson clauses. They are constrained by means of range expressions.

A range expression on a type has the effect of constraining the values of the type to values defined by the range expression. In a schema this constrains the values in the field. In lessons this constrains the values of the placeholder being configured.

The syntax for a constrained type is the same for schema fields and placeholder expressions.

Here are some examples of this syntax as it would appear in a schema definition. Curly braces delineate the range expression.

```inkling--code
schema MyOutput 
   UInt8 {0,1,2,3,4}    label,       # a list of UInt8 values
   String {"a", "bc"}   category,    # a list of Strings
   Int64 {0:5:100}      x,           # start:step:stop, step= 5, 0..100
   Int64 {0:100}        y,           # start:stop, step= 1, 0..100
   Int64 {0..100:25}    z,           # start:stop, numsteps=25, step= 4, 0..100
   Float32 {0..2:5}     a            # gives (0, .5., 1.0, 1.5, 2.0)
end
```

> Range Expression (Constrained Type) Syntax

```inkling--syntax
numericType          
    '{' 
 start ':' [ step':']? stop          # 1:2:10.   Called a 'colon range'. Specifies 'step' (default=1).
 |  
 start '.' '.' stop ':' numSteps     # 1..10:5  Called a 'dot range'. Specifies 'numsteps'.
    '}' 
 
 numericType := Double | Float64 | Float32 | Int8 | Int16 | Int32 | Int64 | UInt8 | UInt16 | UInt32 | UInt64
```

### Numeric Range Rules

```inkling--code
Int64  { 0:4:1 }   is invalid. The step size is larger than the range.
Int64  { 0..1:4 }  is invalid. Values generated are floating point not integer. 
Float32{-1..1:10 } is valid. Negative bounds allowed.
Int8   {0:-4:-100}   is valid. stop  < start is valid if and only if step is negative. 
UInt32 {-10:10}    is invalid. Unsigned integer range contains signed values.
```

A dot range allows the programmer to specify a number of steps. In some contexts it is the number of steps that is significant. A colon range supports specifying the step size, which may be more important in other contexts. Here are some other characteristics of these constructs:

For numeric ranges:

* For colon range, step can be a floating point number. 
* For colon range, the step size can be negative only if stop < start.
* For dot range, number of steps (numSteps) is a positive integer.

For numeric ranges the start point is inclusive (it is included in the values of the range) and fixed. The end point may or may not be included in the values of the range. If you land on it exactly it is in the range. If you don't land on it exactly it is not in the range. For example `Int8 { 0:3:10}` gives you (0, 3, 6, 9). Note that the specification of 10 as the stop is not an error (because it is a limit, not necessarily an endpoint). 

The range stop must be reachable from the range start by applying the step. (The range must be bounded.) The step is optional. If it is not specified the default value is 1. The step can be negative. 

The range start is exact (to the maximum extent possible if the range expression type is floating point). The range end is a limit. That means that if applying the step results in landing exactly on the end point, then the end point is part of the range. Otherwise the highest value landed on that is less than the end point is the final value in the range. 

 
> Value List Constrained Type Syntax

```inkling--syntax
concreteType 
    '{' 
     [ integerLiteral [ ',' integerLiteral ]* ]
  |  [ floatLiteral [ ',' floatLiteral ]* ]
  |  [ stringLiteral [ ',' stringLiteral ]* ]
  |  [ booleanLiteral [ ',' booleanLiteral ]? ]
    '}' 
```

The concrete types include `Bool` and `String` in addition to the numeric types. 

Here are a few examples:

```inkling--code
    String {"red", "3", "green"}    is valid.
    String {"red", 3, "green"}      is invalid (integer value in string range).
    UInt8  {7, 7, 7, 7}             is valid.
    UInt8  {7, -7, 7, 7}            is invalid (negative integer in unsigned range).
```

### Schema Matching

Inkling uses schemas to understand and interpret the data format of streams.  The Inkling compiler performs schema match checking and will report errors if schemas which are expected to match do not. 

Matching for schemas is structural, not name based. Field names don't matter. 
* Two references by name to the same schema match because a schema matches itself. 
* Two references to different schema names match if both schemas define the same list of field types in the same order. For structured types with size, the sizes must be equal.
* Two anonymous schemas match if both define the same field types in the same order. 
* A schema referenced by name matches an anonymous schema if both define the same field types in the same order. 

For example every Inkling program has the predefined stream input available to it. Since there is a single stream associated with the keyword input, there can be only one definition of the data format of that stream. Once defined, the data format of a stream cannot change dynamically.  If that schema changes inkling compiler will flag that change as an error. Thus any reference to the input stream must have a schema that matches all other schemas used with the input stream. 

```inkling--code
concept keep_paddle_under_ball is classifier
  predicts (PlayerMove)
  follows ball_location, 
          input(GameState)      <------- (1) uses Gamestate with input
end
 
concept high_score is classifier
  predicts (PlayerMove)
  follows keep_paddle_under_ball, 
          input(GameState)              <------- (1) uses Gamestate with input
  feeds output
end
 
schema GameState
  Luminance(84, 336) pixels
end
 
concept ball_location is estimator
  predicts (Matrix(UInt32, 1, 2) location)
  follows input(Luminance(84, 336) p) <------- (2) matches Gamestate 
end
 
concept ball_X_location is estimator
  predicts (Uint32 X_location)
  follows input(Luminance(84, 330) p) <-- (3) fails to matches Gamestate 
end
```

Above (1) shows a valid schema match by name. (2) shows a valid match by field type (and size). (3) shows a failed match (size is not equal). 
 
### Schemas and Constraint Compatibility
 
Constraints can be applied to schemas on declaration and in the lesson configure clause. The constraints must be compatible with the schema. Below we have excerpted some Inkling code from the breakout program to show an example. 
 
```inkling--code
simulator breakout_simulator(BreakoutConfig)
   state (GameState)
   action(PlayerMove)
End
 
schema BreakoutConfig
  UInt32 level,
  UInt8{1:4} paddle_width,
  Float32 bricks_percent
end
 
curriculum ball_location_curriculum
  train ball_location
  with simulator breakout_simulator
  objective ball_location_distance
   
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
```

The constraints in a lesson configure clause are constraints on the fields of the configuration schema of the simulator associated with the curriculum. In this example that means that the constraints are constraining the fields of schema `BreakoutConfig`.

Given simulator `breakout_simulator`, the constraints in the lesson configure section of `ball_location_curriculum` must have these characteristics to be compatible with schema `BreakoutConfig`:

1. They must specify exactly the same type and field name as the schema declaration. A constraint cannot use an Int8 where a UInt32 was originally specified.
2. For the range expression, the range in the configure must specify exactly the same range or a subrange as the schema declaration.
3. You cannot specify a step size or a number of steps in the constraint in a configuration schema declaration. That means that in the `BreakoutConfig` schema above, `UInt8{1:4} paddle_width` is valid but `UInt8{1:2:4} paddle_width` would not be valid. The latter specifies a step size of 2.

For the field `level` in schema `BreakoutConfig` here is the constraint that is specified in the lesson `more_bricks` configure clause:

`constrain level with UInt32{1:100}`

Here is the original field declaration in the schema:

```inkling--code
schema BreakoutConfig
  UInt32 level,        # no range expression, called a 'natural range'
  UInt8{1:4} paddle_width,
  Float32 bricks_percent
end
```

This is a compatible range expression because the field in the schema declared no range at all (the range was the natural range) and any range expression is a subrange of a natural range. A natural range is just the complete range of values supported with the data type. For example the natural range of an Int8 is -127..127.

The field `paddle_width` does specify a range expression on the original field declaration in the schema, using values 1 to 4. The constraint is compatible with this because it is identical:

`constrain paddle_width with UInt8{1:4}`

> Examples of valid constraints:

```inkling--code
constrain paddle_width with UInt8{1:3}    # ok: a subset of constraint set

constrain paddle_width with UInt8{2}      # ok: value in constraint set
```

> Examples of invalid constraints

```inkling--code
constrain paddle_width with UInt8{1:5}    # not a subset of constraint set

constrain paddle_width with UInt8{7}      # value not in constraint set
```
