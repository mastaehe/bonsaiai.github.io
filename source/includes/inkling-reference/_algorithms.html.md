# Advanced: Algorithms

> Syntax (in the global scope)

```inkling--syntax
algorithm <localAlgorithmId>
   is <globalAlgorithmId>
   [
     <parameterName> => <literal>
     [ ‘,’ <parameterName> => <literal> ]*
   ]?
end
```

> Example (in the global scope)

```Inkling--code
schema GameState
   Float32 position,
   Float32 velocity,
   Float32 angle,
   Float32 rotation
end

schema Action
   Float32 command
end

schema CartPoleConfig
   Int8 episode_length,
   UInt8 deque_size
end

simulator the_simulator(CartPoleConfig)
   action (Action)
   state (GameState)
end


algorithm My_TRPO_Settings
   is TRPO
   learning_rate => 5,
   network_size => 48
end

concept balance is estimator
   predicts (Action)
   follows input(GameState)
   feeds output

end

curriculum balance_curriculum
   train balance
   using algorithm My_TRPO_Settings
      # optional to override parameter with same type
      learning_rate => 0.5
   end

   with simulator the_simulator
   objective open_ai_gym_default_objective

       lesson balancing
           configure
               constrain episode_length with Int8{-1},
               constrain deque_size with UInt8{1}
           until
               maximize open_ai_gym_default_objective
end
```


> Syntax (in the curriculum)

```inkling-syntax
using algorithm <algorithmIdentifier>
   [
     <parameterName> => <literal>
     [ ‘,’ <parameterName> => <literal> ]*
   end
]?
```

> Example (in the curriculum)

```inkling-code
schema GameState
   Float32 position,
   Float32 velocity,
   Float32 angle,
   Float32 rotation
end

schema Action
   Float32 command
end

schema CartPoleConfig
   Int8 episode_length,
   UInt8 deque_size
end

simulator the_simulator(CartPoleConfig)
   action (Action)
   state (GameState)
end

concept balance is estimator
   predicts (Action)
   follows input(GameState)
   feeds output

end

curriculum balance_curriculum
   train balance
   using algorithm TRPO
      learning_rate => 5
      network_size => 48
   end

   with simulator the_simulator
   objective open_ai_gym_default_objective

       lesson balancing
           configure
               constrain episode_length with Int8{-1},
               constrain deque_size with UInt8{1}
           until
               maximize open_ai_gym_default_objective
end
```

The algorithm clause is for advanced users who want to experiment changing machine learning algorithms and their training parameters. The clause provides syntax either within the curriculum statement to force a choice of algorithm for that curriculum, or it can be specified outside of a curriculum if used in multiple concepts (and therefore multiple lessons). It is also possible to override a global parameter inside of a curriculum if needed.

### Valid Algorithm Identifiers

* `DQN` (Deep Q Learning) - classification only
* `DDPG` - estimation only
* `DiscreteDDPG` - classification only
* `QTable` - classification only
* `TRPO` - estimation only


### Shared Parameter Details

The following parameters all apply to DQN, DDPG, Discrete DDPG, and TRPO. Additional parameter options are shown in subsequent tables below.

| Parameter (Example use)      | Description |
| -                            | -           |
| `hidden_layer_size_descriptor` => [int, int, int, …] <br> (`hidden_layer_size_descriptor => [400, 300]` | An array of hidden layer: int is the hidden layer size. |
| `hidden_layer_activation_descriptor` => [string, string, string, …] <br> (`hidden_layer_activation_descriptor => [“relu”, “tanh”]`) | An array of activation functions (corresponding to the hidden layer size descriptor): string is the activation function type. Strings supported: “linear”, “tanh”, “relu”, “logistic”, “softmax”, “elu”. (Using this should be combined with `hidden_layer_size_descriptor`, in the given example “relu” is the activation function for the first layer, and “tanh” for the second one.) |
| `conv_layer_descriptor` => “int1xint2:int3:int4:int5; …” <br> (`conv_layer_descriptor => “8x8:4:4:32; 3x3:1:1:16”`) | A semicolon delimited string of convolutional network configuration: int1 is x size, int2 is y size, int3 is x stride, int4 is y stride, int5 is number of filters. |
| `conv_compression_size_descriptor` => [int, int, int, ...] <br> (`hidden_layer_descriptor => [20, 10]`)| An array of convolutional compressed size: int is the hidden layer size. |
| `conv_compression_activation_descriptor` => [string, string, string, …] <br> (`conv_compression_descriptor => [“softmax”, “tanh”]`) | An array of activation functions for convolutional network compression: string is the activation function type. Strings supported: “linear”, “tanh”, “relu”, “logistic”, “softmax”, “elu”. (Using this should be combined with `conv_compression_size_descriptor`, in the given example  “softmax” is the activation function for the first layer, and “tanh” for the second one.) |
| `conv_limit_dim` => string (`conv_limit_dim => “x”`) | A string that represents which dimension of the input shape to be used as the convolutional filter sizes. Strings supported: “max”, “min”, “x”, “y”, “0”, “1”. By default, it’s `None`, which uses the original input shapes as the filter sizes. “max” uses the maximum number of x and y inputs as the filter sizes. “min” uses the minimum number of x and y inputs as the filter sizes. “x” or “0” uses the x dimension input shape as the filter sizes. “y” or “1” uses the y dimension input shape as the filter sizes. (The example uses the input x dimension shape as the convolutional filter sizes.) |


### DQN-Specific Parameters

In addition to the first (shared) table of parameters, DQN also has four additional parameters available.

| Parameter (Example use)      | Description |
| -                            | -           |
| `exploration_decay` => float <br> (`exploration_decay => 0.00001`) | The exploration decay in DQN with the data type float. |
| `samples_per_train` => int <br> (`samples_per_train => 10`) | The ratio of number of data sampling and training. |
| `q_learning_rate` => float <br> (`q_learning_rate => 0.0001`) | The learning rate for training the Q network. |
| `gamma` => float <br> (`gamma => 0.99`) | The discount rate for the Bellman Equation. |

### DDPG-Specific (and DiscreteDDPG) Parameters

In addition to the first (shared) table of parameters, DDPR (and DiscreteDDPG) also has three additional parameters available.

| Parameter (Example use)      | Description |
| -                            | -           |
| `mu_learning_rate` => float <br> (`mu_learning_rate => 0.0001`) | The learning rate for training the Mu network. |
| `q_learning_rate` => float <br> (`q_learning_rate => 0.0001`) | The learning rate for training the Q network. |
| `gamma` => float <br> (`gamma => 0.99`) | The discount rate for the Bellman Equation. |

### TRPO-Specific Parameters

In addition to the first (shared) table of parameters, TRPO also has one additional parameter available.

| Parameter (Example use)      | Description |
| -                            | -           |
| `samples_per_train` => int <br> (`samples_per_train => 10`) | The ratio of number of data sampling and training. |

### Q-Table Parameters

These are the only three parameters available for Q-Tables. They do not share any of the parameters from the first (shared) table.

| Parameter (Example use)      | Description |
| -                            | -           |
| `exploration_decay` => float <br> (`exploration_decay => 0.00001`) | The exploration decay in DQN with the data type float. |
| `q_learning_rate` => float <br> (`q_learning_rate => 0.0001`) | The learning rate for training the Q network. |
| `gamma` => float <br> (`gamma => 0.99`) | The discount rate for the Bellman Equation. |
