# Constants

This is the reference for the keyword **constant**. 

```inkling--code
constant Int8 maxVelocity = 100
constant Int8 minVelocity = 0
schema MyOutput
    UInt8{ minVelocity:maxVelocity }  speed
end 
```


Inkling supports named constants for Inkling primitive types, including numeric
types, String, and Bool. The name can be used wherever the value can appear. 


Constants make code easier to understand and modify because the constant name
conveys the semantics of the constant. They document the logic of the program.


```inkling--code
constant Int8 right = 0
constant Int8 left = 1 
constant Int8 up = 3
constant Int8 down = 4 
schema Action
    Int8{right, left, up, down} move
end
```

Some constant declarations and an example of their use are shown in the
accompanying panel.


The constants declaration syntax is shown in the accompanying panel.
> Constant Syntax

```inkling--syntax
constantDeclaration ::=
  constant  primitiveType <name> = literal
```

```inkling--syntax
primitiveType ::=
  Float32 | Int8 | Int16 | Int32 | Int64 | UInt8 | UInt16 | UInt32  | UInt64 | Bool | String
```

### Usage

* A constant declaration can appear only in the outermost program scope. It cannot be nested within another statement. 
* A named constant does not have to be declared before it is used. 
* A named constant can be used anywhere a literal can be used. That includes 
being used in range expressions. 
* The initialized value of the constant must be compatible with the declared
type of the constant. 
* The declared type of the constant must be compatible with the type 
of the context where it is used. Some examples of
invalid usage are shown in the accompanying panel. 
   
```inkling--code
constant UInt32 BigNum = 100000
constant Float32 AFloat = 1.0
schema Foo
  UInt8 field1  {1:BigNum}          # invalid
  UInt32 field2 {Afloat:10000}      # invalid
end
```
