# OpenAI Gym: Cartpole

> ![Cartpole Balance](../images/cart-pole-balance.gif)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally.

<aside class="notice">
This example has now been replaced by the Stellar Cartpole example as the default Cartpole when you create a "Cartpole" demo on the platform.
</aside>

In this example, we'll walk you through the various statements that are part of the Cartpole Inkling file. Each statement is followed by an explanation of the statement.

Cartpole is a classic control problem. [OpenAI Gym][2] describes it as:

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
constant Int8 left = 0
constant Int8 right = 1
schema Action
    Int8{left, right} command
end
```

The schema `Action` names a record — `action` —  and assigns it a constrained type. We have added constants to this schema to demonstrate how they can be optionally used.

```inkling
schema CartPoleConfig
    Int8 episode_length,
    UInt8 deque_size
end
```

 The schema `CartPoleConfig` names two records — `episode_length` and
 `deque_size` — and assigns each of them a type.   `episode_length` is a signed `Int8` because -1 is used for "run until pole drops".


###### Concept

```inkling
concept balance is classifier
    predicts (Action)
    follows input(GameState)
    feeds output
end
```

The concept is named `balance`, and it takes input from the simulator. That input is the records in the schema `GameState`. The balance concept outputs the move the AI should make in the simulator. This output is the record in the `Action` schema.

###### Simulator

```inkling
simulator cartpole_simulator(CartPoleConfig) 
    action (Action)
    state (GameState)
end
```

Simulator `cartpole_simulator` gets information from three schemas. The first schema, `CartPoleConfig`, specifies the schema for configuration of the simulation. The second schema `Action` specifies the action that the AI will take in the simulation. The third schema `GameState` contains the state of the simulator that is sent to the lesson.

###### Curriculum

```inkling
curriculum balance_curriculum
    train balance
    with simulator cartpole_simulator
    objective open_ai_gym_default_objective

        lesson balancing
            configure
                constrain episode_length with Int8{-1},
                constrain deque_size with UInt8{1}
            until
                maximize open_ai_gym_default_objective
end
```

The curriculum's name is `balance_curriculum`. It trains the `balance` concept with the `cartpole_simulator`. The objective for this curriculum is `up_time`. The objective measures how long the pole stays upright.

This curriculum contains one lesson, called `balancing`. It configures the simulation, by setting two constraints for the state of the simulator. The lesson trains until the AI has maximized the objective.

## Simulator File

```python
import sys
import logging
from bonsai_ai import Brain, Config
from bonsai_gym import GymSimulator

log = logging.getLogger('gym_simulator')
log.setLevel(logging.DEBUG)


class CartPole(GymSimulator):
    # Environment name, from openai-gym
    environment_name = 'CartPole-v0'

    # simulator name from Inkling
    # Example Inkling:
    #   curriculum balance_curriculum
    #       train balance
    #       with simulator cartpole_simulator
    #       ....
    simulator_name = 'cartpole_simulator'

    # convert openai gym observation to our state schema
    # Example Inkling:
    #   schema GameState
    #       Float32 position,
    #       Float32 velocity,
    #       Float32 angle,
    #       Float32 rotation
    #   end
    def gym_to_state(self, observation):
        state = {'position': observation[0],
                 'velocity': observation[1],
                 'angle':    observation[2],
                 'rotation': observation[3]}
        return state

    # convert our action schema into openai gym action
    # Example Inkling:
    #   schema Action
    #       Int8{0, 1} command
    #   end
    def action_to_gym(self, action):
        return action['command']


if __name__ == '__main__':
    # create a brain, openai-gym environment, and simulator
    config = Config(sys.argv)
    brain = Brain(config)
    sim = CartPole(brain)
    sim.run_gym()
```

This is an OpenAI Gym example which uses the OpenAI environment as its simulator. For more information about the simulator used see the [Bonsai Gym Common GitHub repo][3] which is a python library for integrating a Bonsai BRAIN with OpenAI Gym environments.

[1]: https://github.com/BonsaiAI/bonsai-sdk/tree/master/samples/openai-gym/gym-cartpole-sample
[2]: https://gym.openai.com/envs/CartPole-v1
[3]: https://github.com/BonsaiAI/bonsai-sdk/tree/master/bonsai-gym
[4]: https://beta.bons.ai/new
