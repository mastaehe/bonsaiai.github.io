# Simulator Class

>![Simulator state image](../images/simulator_state.svg)

This class is used to interface with the server while training or running predictions against
a **BRAIN**. It is an abstract base class, and to use it a developer must create a subclass.

The `Simulator` class is closely related to the **Inkling** file that is associated with
the **BRAIN**. The name used to construct `Simulator` must match the name of the simulator
in the *Inkling* file.

There are two main methods that you must override, `episode_start` and `simulate`. The diagram
demonstrates how these are called during training.

## Brain brain()
Returns the BRAIN being used for this simulation.

## string name()
Returns the simulator name that was passed in when constructed.

## bool predict()
Returns a value indicating whether the simulation is set up to run in predict mode or training mode.

## string objective_name()
Accessor method that returns the name of the current objective.
The objective may be updated before `episode_start` is called. When running
for prediction and during start up, objective will return an empty std::string.

## episode_start(parameters, initial_state)

> Example Inkling:

```inkling
schema Config
    UInt8 start_angle
end

schema State
    Float32 angle,
    Float32 velocity
end
```

> Example code:

```cpp
void MySimulator::episode_start(const InklingMessage& params, InklingMessage& initial_state) {
    cout << objective_name() << endl;
    angle = params.get_float32("start_angle");
    initial_state.set_float32("velocity", velocity);
    initial_state.set_float32("angle",    angle);
}
```

```python
def episode_start(self, params):
    print(self.objective_name)
    self.angle = params.start_angle
    initial = {
        "angle": self.angle,
        "velocity": self.velocity,
    }
    return initial
```

| Argument | Description |
| --- | --- |
| `parameters` | InklingMessage of episode initialization parameters as defined in inkling. `parameters` will be populated if a training session is running. |
| `initial_state` | Output InklingMessage. The subclasser should populate this message with the initial state of the simulation. |

This callback passes in a set of initial parameters and expects an initial state in return
for the simulator. Before this callback is called, the property `objective_name` will be
updated to reflect the current objective for this episode.

This call is where a simulation should be reset for the next round.

The default implementation will throw an exception.

## simulate(action, state, reward, terminal)

> Example Inkling:

```inkling
schema Action
    Int8{0, 1} delta
end
```

> Example code:

```python
def simulate(self, action):
    velocity = velocity - action.delta;
    terminal = (velocity <= 0.0)
    reward = reward_for_objective(self.objective_name)
    state = {
        "velocity": self.velocity,
        "angle": self.angle,
    }
    return (state, reward, terminal)
```

```cpp
void Test::simulate(const InklingMessage& action,
    InklingMessage& state, float& reward, bool& terminal) {
    velocity = velocity - action.get_int8("delta");
    terminal = (velocity <= 0.0);
    reward = reward_for_objective(objective_name());
    state.set_float32("velocity", velocity);
    state.set_float32("angle",    angle);
}
```

| Argument | Description |
| --- | --- |
| `action` | Input InklingMessage of action to be taken as defined in inkling. |
| `state`  | Output InklingMessage. Should be populated with the current simulator state. |
| `reward` | Output reward value as calculated based upon the objective. |
| `terminal` | Output terminal state. Set to true if the simulator is in a terminal state. |

This callback steps the simulation forward by a single step. It passes in
the `action` to be taken, and expects the resulting `state`, `reward` for the current
`objective`, and a `terminal` flag used to signal the end of an episode. Note that an
episode may be reset prematurely by the backend during training.

For a multi-lesson curriculum, the `objective_name` will change from episode to episode.
In this case ensure that the simulator is returning the correct reward for the
different lessons.

Returning `true` for the `terminal` flag signals the start of a new episode.

The default implementation will throw an exception.

## bool standby(reason)

| Argument | Description |
| --- | --- |
| `reason` | A std::string describing the reason training has been delayed. |

The default action is to wait one second and continue. If returns `true`,
the server status will be checked again and the loop will continue.

## bool run()

```python
mySim = MySimulator(brain)
while mySim.run():
    continue
```

```cpp
MySimulator mySim(brain);
while( mySim.run() ) {
    continue;
}
```

Main loop call for driving the simulation. Returns `false` when the
simulation has finished or halted.

The client should call this method in a `while` loop until it returns `false`.
To run for prediction, `brain()->config()->predict()` must return `true`.

## Event get_next_event()
    
```cpp
auto event = get_next_event();
if (event->type() == Type::Episode_Start) {
    auto es_E = dynamic_pointer_cast<EpisodeStartEvent>(event);
    auto initial_properties = es->initial_properties;
    auto initial_state = es->initial_state;
    // process initial properties/state
} else if (event->type() == Type::Simulate) {
    auto sim_E = dynamic_pointer_cast<SimulatorEvent>(event);
    auto prediction = sim_E->prediction;
    auto state = sim_E->state;
    auto reward = sim_E->reward;
    auto terminal = sim_E->terminal;
    // process simulator step 
} else if (event->type() == Type::Finished) {
    close();
}
```

Returns the next simulator event in the queue.

## void close()
  
```cpp
if (event->type() == Type::Finished) close();
```

Closes the connection between `Simulator` and the Bonsai BRAIN.

## operator<<(ostream, simulator)

Prints out a representation of Simulator that is useful for debugging.

**Note:** Used in C++ only.

| Argument | Description |
| --- | --- |
| `ostream` | std c++ stream operator. |
| `config` | Object returned by previously created `Bonsai::Config`. |

