# Basic Python/C++ Simulation

> ![Find the Center Diagram](../images/find-the-center.png)

[**Download the full source code on GitHub**][1] if you want to run this simulator locally.

In this example, we'll walk you through the various statements that are part of the *Find the Center* game, including options for either a Python or C++ simulator file and the Inkling file. This is a very basic example of Inkling and how to connect to a custom simulator and shows the differences between using `libbonsai` (C++) and the `bonsai-ai` (Python) libraries.

*Find the Center* is a simple game where the AI seeks the average value between two numbers. In this game, the AI begins at a random value of 0, 1, or 2. The AI then can move to a lower number by outputting -1, a higher number by outputting +1, or staying on the same number by outputting 0. The goal of *Find the Center* is to remain in the center of 0 and 2 (the number 1).

## Inkling File

###### Schema

```inkling
schema GameState
    Int8 value
end
```

The `GameState` schema has one field, `value`, with type `Int8`.

```inkling
schema PlayerMove
    Int8{-1, 0, 1} delta
end
```

The `PlayerMove` schema has one field, `delta`, with type `Int8`. The `Int8` type is constrained to three possible values: -1, 0, and 1.

```inkling
schema SimConfig
    Int8 dummy
end
```

The `SimConfig` schema has one field, `dummy`, because there is no configuration needed in this particular example.

###### Concept

```inkling
concept find_the_center
    is classifier
    predicts (PlayerMove)
    follows input(GameState)
    feeds output
end
```

This concept is named `find_the_center`. `find_the_center` expects input about the state of the game (defined by the `GameState` schema) and replies with output defined by the `PlayerMove` schema. This is the AI's next move in the simulation.

###### Simulator

```inkling
simulator find_the_center_sim(SimConfig)
    action (PlayerMove)
    state (GameState)
end
```

The `simulator` is called `find_the_center_sim` (shown in #simulator-file) and takes the schema input of `SimConfig` (even though it isn't configuring anything, it's required by the simulator). The `find_the_center` concept will be trained using the `find_the_center_sim` simulator. To define the training relationship between the simulator and the concept we must begin by defining the simulator. `find_the_center_sim` expects an action defined in the `PlayerMove` schema as input and replies with a state defined in the `GameState` schema as output.

###### Curriculum

```inkling
curriculum find_the_center_curriculum
    train find_the_center
    with simulator find_the_center_sim
    objective time_at_goal
        lesson seek_center
            configure
                constrain dummy with Int8{-1}
            until
                maximize time_at_goal
end
```

The curriculum is named `find_the_center_curriculum`, and it trains the `find_the_center` concept using the `find_the_center_sim`.

This curriculum contains one lesson, called `seek_center`. It configures the simulation, by setting a number of constraints for the state of the simulator. The lesson trains until the AI has maximized the objective `time_at_goal`.


## Simulator File

```python
""" This Basic simulator is for learning the simulator interface.
It can be used in this case to find the center between two numbers.
"""
import bonsai_ai
from random import randint


class BasicSimulator(bonsai_ai.Simulator):
    """ A basic simulator class that takes in a move from the inkling file,
    and returns the state as a result of that move.
    """
    min = 0
    max = 2
    goal = 1
    started = False

    def episode_start(self, parameters=None):
        """ called at the start of every episode. should
        reset the simulation and return the initial state
        """

        # reset internal initial state
        self.goal_count = 0
        self.value = randint(self.min, self.max)

        # print out a message for our first episode
        if not self.started:
            self.started = True
            print('started.')

        # return initial external state
        return {"value": self.value}

    def simulate(self, action):
        """ run a single step of the simulation.
        if the simulation has reached a terminal state, mark it as such.
        """

        # perform the action
        self.value += action["delta"]
        if self.value == self.goal:
            self.goal_count += 1

        # is this episode finished?
        terminal = (self.value < self.min or
                    self.value > self.max or
                    self.goal_count > 3)
        state = {"value": self.value}
        reward = self.goal_count
        return (state, reward, terminal)


if __name__ == "__main__":
    config = bonsai_ai.Config()
    brain = bonsai_ai.Brain(config)
    sim = BasicSimulator(brain, "find_the_center_sim")

    print('starting...')
    while sim.run():
        continue

```

```cpp
// Copyright (C) 2017 Bonsai, Inc.

#include <iostream>
#include <memory>
#include <string>
#include <random>

#include "bonsai/bonsai.hpp"

// std
using std::cout;
using std::endl;
using std::make_shared;
using std::move;
using std::shared_ptr;
using std::string;

using std::random_device;
using std::mt19937;
using std::uniform_int_distribution;

// bonsai
using bonsai::Brain;
using bonsai::Config;
using bonsai::InklingMessage;
using bonsai::Simulator;

// random number generator
random_device rd;
mt19937 rng(rd());

// basic simulator
class BasicSimulator : public Simulator {
    constexpr static int8_t _min = 0, _max = 2, _goal = 1;
    int8_t _goal_count = 0;
    int8_t _value = 0;
    uniform_int_distribution<int8_t> _uni{_min, _max};
 public:
    explicit BasicSimulator(shared_ptr<Brain> brain, string name )
        : Simulator(move(brain), move(name)) {}

    void episode_start(const InklingMessage& params,
        InklingMessage& initial_state) override;
    void simulate(const InklingMessage& action,
        InklingMessage& state,
        float& reward,
        bool& terminal) override;
};

void BasicSimulator::episode_start(
    const InklingMessage& params,
    InklingMessage& initial_state) {

    // reset
    _goal_count = 0;
    _value = _uni(rng);

    // set intial state
    initial_state.set_int8("value", _value);

    // print a message for our first episode
    static bool started = false;
    if (!started) {
        started = true;
        cout << "started." << endl;
    }
}

void BasicSimulator::simulate(
    const InklingMessage& action,
    InklingMessage& state,
    float& reward,
    bool& terminal) {

    // perform the action
    _value += action.get_int8("delta");
    if (_value == _goal)
        _goal_count++;

    // output
    state.set_int8("value", _value);
    terminal = _value < _min || _value > _max || _goal_count > 3;
    reward = _goal_count;
}


int main(int argc, char** argv) {
    auto config = make_shared<Config>(argc, argv);
    auto brain = make_shared<Brain>(config);

    BasicSimulator sim(brain, "find_the_center_sim");

    cout << "starting..." << endl;
    while ( sim.run() ) {
        continue;
    }

    return 0;
}
```

This is a basic simulator for learning the simulator library. In this case it is used to find the center between two numbers, 0 and 2. The goal, as outlined in the Inkling file, is to reach 1. The moves that the simulator is able to make are sent from the Inkling file to the simulator and the state of the simulator is sent back to Inkling.

The [README file][2] contained in the project has instructions for running this simulator in either Python or C++.

[1]: https://github.com/BonsaiAI/bonsai-sdk/blob/master/samples/find-the-center-py
[2]: https://github.com/BonsaiAI/bonsai-sdk/blob/master/samples/find-the-center-py/README.md