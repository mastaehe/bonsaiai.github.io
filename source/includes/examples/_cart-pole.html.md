# OpenAI Gym: Cart Pole

> ![Cart Pole Balance](../images/cart-pole-balance.gif)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally or create a new BRAIN on [beta.bons.ai][4] to run it yourself on the Bonsai Platform.

In this example, we'll walk you through the various statements that are part of the Cart Pole Inkling file. Each statement is followed by an explanation of the statement.

Cart Pole is a classic control problem. [OpenAI Gym][2] describes it as:

_A pole is attached by an un-actuated joint to a cart, which moves along a frictionless track. The system is controlled by applying a force of +1 or -1 to the cart. The pendulum starts upright, and the goal is to prevent it from falling over. A reward of +1 is provided for every timestep that the pole remains upright. The episode ends when the pole is more than 15 degrees from vertical, or the cart moves more than 2.4 units from the center._

## Inkling File

###### Schema

```inkling
schema GameState
  Float32 position,
  Float32 velocity,
  Float32 angle,
  Float32 rotation
end
```

The schema `GameState` names four records — `position`, `velocity`, `angle`, and `rotation` — and assigns a type to them. This information is input from the simulation.

```inkling
schema Action
  Int8{0,1} action
end
```

The schema `Action` names a record — `action` —  and assigns it a constrained type.

```inkling
schema CartPoleConfig
  Int8 episode_length,
  Int8 num_episodes,
  UInt8 deque_size
end
```

 The schema `CartPoleConfig` names three records — `episode_length`, `num_episodes`, and `deque_size` — and assigns each of them a type.

###### Concept

```inkling
concept balance
  is classifier
  predicts Action
  follows input(GameState)
  feeds output
end
```

The concept is named `balance`, and it takes input from the simulator. That input is the records in the schema `GameState`. The balance concept outputs the move the AI should make in the simulator. This output is the record in the `Action` schema.

###### Simulator

```inkling
simulator cartpole_simulator(CartPoleConfig)
  state (GameState)
end
```

The `cartpole_simulator` gets information from two schemas. The first schema, `CartPoleConfig`, specifies the schema for configuration of the simulation. The second schema contains the state of the simulator that is sent to the lesson.

###### Curriculum

```inkling
curriculum balance_curriculum
  train balance
  with simulator cartpole_simulator
  objective up_time
  lesson balancing
    configure
      constrain episode_length with Int8{-1}
      constrain num_episodes with Int8{-1}
      constrain deque_size with UInt8{1}
    until
      maximize up_time
end
```

The curriculum's name is `balance_curriculum`. It trains the `balance` concept with the `cartpole_simulator`. The objective for this curriculum is `up_time`. The objective measures how long the pole stays upright.

This curriculum contains one lesson, called `balancing`. It configures the simulation, by setting a number of constraints for the state of the simulator. The lesson trains until the AI has maximized the objective.

## Simulator File

```python
import gym

import bonsai
from bonsai_gym_common import GymSimulator

ENVIRONMENT = 'CartPole-v0'
RECORD_PATH = None

class CartPoleSimulator(GymSimulator):

    def __init__(self, env, record_path):
        GymSimulator.__init__(
            self, env, skip_frame=1,
            record_path=record_path)

    def get_state(self):
        parent_state = GymSimulator.get_state(self)
        state_dict = {"position": parent_state.state[0],
                      "velocity": parent_state.state[1],
                      "angle": parent_state.state[2],
                      "rotation": parent_state.state[3]}
        return bonsai.simulator.SimState(state_dict, parent_state.is_terminal)

if __name__ == "__main__":
    env = gym.make(ENVIRONMENT)
    simulator = CartPoleSimulator(env, RECORD_PATH)
    bonsai.run_for_training_or_prediction("cartpole_simulator", simulator)
```

This is an OpenAI Gym example which uses the OpenAI environment as its simulator. For more information about the simulator used see the [Bonsai Gym Common GitHub repo][3] which is a python library for integrating a Bonsai BRAIN with Open AI Gym environments.

[1]: https://github.com/BonsaiAI/gym-cartpole-sample
[2]: https://gym.openai.com/envs/CartPole-v1
[3]: https://github.com/BonsaiAI/bonsai-gym-common
[4]: https://beta.bons.ai/new
