# Event Pump Cartpole

> ![Cartpole Balance](../images/cart-pole-balance.gif)

[**Download the full source code on GitHub**][1] if you want to run this simulator.

This example demonstrates how instances of the `Event` class can be used to drive a custom simulation loop. Rather than relying on machinery internal to `bonsai_ai.Simulator`, the `CartPoleTrainer` class advances the simulation event by event, which, in turn, allows for custom logic at each stage.

This event pump interface is for when you can't squeeze your particular application logic into the prescribed callback interface, your implementation may benefit from employing this pattern.

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
schema Action
    Int8{0, 1} command
end
```

The schema `Action` names a record — `action` —  and assigns it a constrained type.

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

The `cartpole_simulator` gets information from two schemas. The first schema, `CartPoleConfig`, specifies the schema for configuration of the simulation. The second schema contains the state of the simulator that is sent to the lesson.

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

## Simulator Files

> cartpole_simulator.py

```python
import gym
import sys
from bonsai_ai import Brain, Config
from bonsai_gym import GymSimulator
from bonsai_ai.logger import Logger
from bonsai_ai import EpisodeStartEvent, SimulateEvent, \
    EpisodeFinishEvent, FinishedEvent, UnknownEvent

from star import state, terminal, action, reward, params

log = Logger()


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

    def render(self):
        self._env.render()


class CartPoleTrainer(object):

    def __init__(self, sim):
        self._sim = sim
        self._episode_count = 0
        self._episode_reward = 0

    def run(self):
        event = self._sim.get_next_event()

        if isinstance(event, EpisodeStartEvent):
            log.event("Episode Start")
            observation = self._sim.gym_episode_start(params(event))
            event.initial_state = state(observation)

        elif isinstance(event, SimulateEvent):
            log.event("Simulate")
            obs, rwd, done, _ = self._sim.gym_simulate(action(event))
            event.state = state(obs)
            event.reward = reward(rwd)
            event.terminal = terminal(done)
            self._episode_reward += rwd
            self._sim.render()

        elif isinstance(event, EpisodeFinishEvent):
            log.event("Episode Finish")
            print("Episode {} reward: {}".format(
                self._episode_count, self._episode_reward))
            self._episode_count += 1
            self._episode_reward = 0

        elif isinstance(event, FinishedEvent):
            log.event("Finished")
            return False
        elif event is None:
            return False

        return True


if __name__ == '__main__':
    # create a brain, openai-gym environment, and simulator
    config = Config(sys.argv)
    brain = Brain(config)
    sim = CartPole(brain)
    trainer = CartPoleTrainer(sim)
    while trainer.run():
        pass

```

> star.py

```python
def state(observation):
    return {'position': observation[0],
            'velocity': observation[1],
            'angle':    observation[2],
            'rotation': observation[3]}


def action(event):
    return event.action['command']


# included for completeness w.r.t. the "STAR" pattern
# for more information, see Bonsai documentation
def terminal(val):
    return bool(val)


# included for completeness w.r.t. the "STAR" pattern
# for more information, see Bonsai documentation
def reward(val):
    return float(val)


def params(event):
    return event.initial_properties
```

This is an OpenAI Gym example which uses the OpenAI environment as its simulator. For more information about the simulator used see the [Bonsai Gym Common GitHub repo][3] which is a python library for integrating a Bonsai BRAIN with OpenAI Gym environments.

[1]: https://github.com/BonsaiAI/bonsai-sdk/tree/master/samples/openai-gym/gym-cartpole-event-sample
[2]: https://gym.openai.com/envs/CartPole-v1
[3]: https://github.com/BonsaiAI/bonsai-sdk/tree/master/bonsai-gym
