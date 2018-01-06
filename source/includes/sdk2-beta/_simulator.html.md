# Simulator Class

> ![Simulator state image][1]

This class is used to interface with the server while training or running predictions against
a **BRAIN**. It is an abstract base class, and the developer must create a subclass.

The `Simulator` class has a close relationship with the **Inkling** file associated with
the **BRAIN**. The name used to construct the `Simulator` must match the name of the simulator
in the *Inkling* file.

There are two main methods one must override, `episode_start` and `simulate`.

## Brain brain()
Returns the brain being used for this simulation.

## string name()
Returns the simulator name that was passed in when constructed

## bool predict()
Returns weather or not the simulation is setup to run in predict or training mode

## string objective_name()
Accessor method which returns the name of the current objective.
Objective may be updated before `episode_start` is called. When running
for prediction and during start up, objective will return an empty string.

## episode_start(parameters, initial_state)

### Arguments
- `parameters`     InklingMessage of initialization parameters for an episode as defined in
                   inkling. `parameters` Will be populated if a training session is running.
- `initial_state`  Output InklingMessage. The subclasser should populate this message with the
                   initial state of the simulation.

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

This callback passes in a set of initial parameters and expects an initial state in return
for the simulator. Before this callback is called, the property `objective_name` will be
updated to reflect the current objective for this episode.

This call is where a simulation should be reset for the next round.

## simulate(action, state, terminal)

### Arguments
- `action`   Input InklingMessage of action to be taken as defined in inkling.
- `state`    Output InklingMessage. Should be populated with the current simulator state.
- `reward`   Output reward value as calculated based upon the objective.
- `terminal` Output terminal state. Set to true if the simulator is in a terminal state.

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

This callback is used to step the simulation forward by a single step. It passes in
the `action` to be taken, and expects the resulting `state`, `reward` for the current
`objective`, and a `terminal` flag used to signal the end of an episode. Note that an
episode may be reset prematurely by the backend during training.

For multi-lesson curriculum the `objective_name` will change from episode to episode.
The simulator should take care to insure that it is returning the correct reward for the
different lessons.

Returning `true` for the `terminal` flag will signal the start of a new episode.

## bool standby(reason)

### Arguments
- `reason`  A string describing the reason training has been delayed

The default action is to wait one second and continue. If returns `true`,
the server status will be checked again and the loop will continue.

bool run()

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

Main loop call for driving the simulation. Will return `false` when the
simulation has finished or halted.

The client should call this method in a `while` loop until it returns `false`.
To run for prediction `brain()->config()->predict()` must return `true`.

[1]: ../images/simulator_state.svg