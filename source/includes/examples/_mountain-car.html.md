# OpenAI Gym: Mountain Car

> ![Mountain Car Control](../images/mountain-car-control.gif)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally. If you want to run Mountain Car remotely on the Bonsai Platform as a managed simulator, create a new BRAIN selecting the Mountain Car demo on [beta.bons.ai][4]

We've used pieces of code from this example in several places, but here we'll walk you through all the various statements that are part of the Mountain Car Inkling file. Each statement is followed by an explanation of the statement.

Mountain Car is a classic control problem. [OpenAI Gym][2] describes it as:

_A car is on a one-dimensional track, positioned between two "mountains". The goal is to drive up the mountain on the right; however, the car's engine is not strong enough to scale the mountain in a single pass. Therefore, the only way to succeed is to drive back and forth to build up momentum._

## Inkling File

###### Schema

```inkling
schema GameState
    Float32 x_position,
    Float32 x_velocity
end
```

The `GameState` schema names two records — `x_position` and `y_position` — and assigns a type to them.

```inkling
schema Action
    Int8{0, 1, 2} command
end
```

The `Action` schema names a single record — `action` — and assigns a constrained type to it.

```inkling
schema MountainCarConfig
    Int8 episode_length,
    UInt8 deque_size
end
```

The `MountainCarConfig` schema names two records — `episode_length` and `deque_size` — and assigns types to them.

###### Concept

```inkling
concept high_score is classifier
    predicts (Action)
    follows input(GameState)
    feeds output
end
```

The concept is named `high_score`, and it takes input from the simulator about the state of the game (`GameState` schema). It outputs to the `Action` schema. This is the AI's next move in the game.

###### Simulator

```inkling
simulator mountaincar_simulator(MountainCarConfig)
    action (Action)
    state (GameState)
end
```

The `mountaincar_simulator` gets information from two schemas. The first schema, `MountainCarConfig`, specifies the schema for configuration of the simulation. The second schema contains the state of the simulator that is sent to the lesson.

###### Curriculum

```inkling
curriculum high_score_curriculum
    train high_score
    with simulator mountaincar_simulator
    objective open_ai_gym_default_objective

        lesson get_high_score
            configure
                constrain episode_length with Int8{-1},
                constrain deque_size with UInt8{1}
            until
                maximize open_ai_gym_default_objective
end
```

The curriculum is named `high_score_curriculum`, and it trains the `high_score` concept using the `mountaincar_simulator`. This curriculum contains one lesson, called `get_high_score`. It configures the simulation, by setting two constraints for the state of the simulator.

The lesson trains until the AI has maximized the objective named `score`.

## Simulator File

```python
import gym

import bonsai
from bonsai_gym_common import GymSimulator

ENVIRONMENT = 'MountainCar-v0'
RECORD_PATH = None
SKIPPED_FRAME = 4

class MountainCarSimulator(GymSimulator):

    def __init__(self, env, skip_frame, record_path):
        GymSimulator.__init__(
            self, env, skip_frame=skip_frame,
            record_path=record_path)

    def get_state(self):
        parent_state = GymSimulator.get_state(self)
        state_dict = {"x_position": parent_state.state[0],
                      "x_velocity": parent_state.state[1]}
        return bonsai.simulator.SimState(state_dict, parent_state.is_terminal)

if __name__ == "__main__":
    env = gym.make(ENVIRONMENT)
    simulator = MountainCarSimulator(env, SKIPPED_FRAME, RECORD_PATH)
    bonsai.run_for_training_or_prediction("mountaincar_simulator", simulator)
```

This is an OpenAI Gym example which uses the OpenAI environment as its simulator. For more information about the simulator used see the [Bonsai Gym Common GitHub repo][3] which is a python library for integrating a Bonsai BRAIN with Open AI Gym environments.

[1]: https://github.com/BonsaiAI/gym-mountaincar-sample
[2]: https://gym.openai.com/envs/MountainCar-v0
[3]: https://github.com/BonsaiAI/bonsai-gym-common
[4]: https://beta.bons.ai/new

