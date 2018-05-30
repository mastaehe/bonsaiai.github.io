# Event Class

[Need text on what this is for and when someone might want to use it.]

## EpisodeStartEvent

```python
event = sim.get_next_event()
if isinstance(event, EpisodeStartEvent):
    state = sim.episode_start(event.initial_properties)
    event.initial_state = state
```

This event is generated at the start of a training episode.
It is triggered either by a terminal condition in the simulator
or by the platform itself.

| Attribute | Description |
| ---      | ---         |
| `initial_properties`  |  Configuration properties for the simulator. |
| `initial_state`   |  Assign the state resulting from a model reset. |

## SimulateEvent

```python
event = sim.get_next_event()
if isinstance(event, SimulateEvent):
    state, reward, terminal = sim.simulate(event.action)
    event.state = state
    event.reward = float(reward)
    event.terminal = bool(terminal)
```

This event is generated when an action (prediction) is ready
to be fed into the simulator.

| Attribute | Description |
| ---      | ---         |
| `action`  |  Next action (prediction) in the queue. |
| `state`   |  Assign the resulting state after updating the model. |
| `reward`   |  The reward calculated from the updated. |
| `terminal`   |  Whether the updated state is terminal. |

## FinishedEvent

```python
event = get_next_event()
if isinstance(event, FinishedEvent):
    self.close()
```

Indicates that the Bonsai Platform has terminated training.

## UnknownEvent

Catch-all event for other internal states. This event can be safely ignored,
but it is provided for completeness and is handy for explicitly tracking state
transitions from client code.


