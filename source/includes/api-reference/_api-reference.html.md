# API Overview

The Bonsai Platform provides programmers and data scientists with a new way of
building sophisticated ML and AI applications. This API is at the core of how
programmers interact with the AI Engine.

The Bonsai BRAIN API has two feature areas:

* Managing BRAINS
* Connecting simulators for training and use.

TThe root for all Bonsai Platform API requests is [https://api.bons.ai]().

[//]: # (Add # Authentication section here)

# User and BRAIN Status

## GET User Status

> Example JSON Response

```json
{
   "brains":  [{
       "id": 1
       "name": "mybrain1",
       "url": "/megan/mybrain1",
       "status": "uninitialized"

   }, {
       "id": 2
       "name": "mybrain2",
       "url": "/megan/mybrain2",
       "status": "trained",
       "training": "/megan/mybrain2/dev",
   }, {
       "id": 3
       "name": "mybrain3",
       "url": "/megan/mybrain3",
       "status": "training",
       "training": "/megan/mybrain3/dev",
       "predictor": "/megan/mybrain3/12"
   }]
}
```

List all BRAINs owned by the user.

### Request

`GET /v1/{userName}`

| Parameter | Description |
| --- | --- |
| userName | Name of the user |

### Response

| Parameter | Description |
| --- | --- |
| id | Numerical id of the BRAIN |
| name | Name of the BRAIN |
| url | URL of the BRAIN |
| status | Name of the user |

## GET BRAIN Status

> Example JSON Response

```json
{
   "id": 1
   "name": "mybrain1",
   "simulators": [{
       "name": "breakout",
       "objectives": ["score", "ball_location_distance"]
   }],
   "latest": "/v1/megan/mybrain/11"
}
```

Get information about a BRAIN.

### Request

`GET /v1/{userName}/{brainName}`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |

### Response

| Parameter | Description |
| --- | --- |
| id | numerical id of the BRAIN |
| name | name of the BRAIN |
| simulators | array of simulations used to train this BRAIN |
| latest | URL to the latest BRAIN |


# Project Files

## GET File

> Example JSON Response

```json
{
  "inkling": "schema GameState\n    Float32 x_position,\n    Float32 x_velocity\nend\n\nschema Action\n    Int8{0, 1, 2} command\nend\n\nschema MountainCarConfig\n    Int8 episode_length,\n    Int8 num_episodes,\n    UInt8 deque_size\nend\n\nsimulator mountaincar_simulator(MountainCarConfig)\n    action (Action)\n    state (GameState)\nend\n\nconcept high_score is classifier\n    predicts (Action)\n    follows input(GameState)\n    feeds output\nend\n\ncurriculum high_score_curriculum\n    train high_score\n    with simulator mountaincar_simulator\n    objective open_ai_gym_default_objective\n\n        lesson get_high_score\n            configure\n                constrain episode_length with Int8{-1},\n                constrain num_episodes with Int8{-1},\n                constrain deque_size with UInt8{1}\n            until\n                maximize open_ai_gym_default_objective\nend\n",
  "compiler_version": "1.8.24"
}
```

Get the contents of a specified project file, for example, the Inkling code in the *.ink* file for a BRAIN.

### Request

`GET /v1/{userName}/[brainName]/?file={fileName}`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |
| fileName | name of the file to get |

### Response

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |

## PUT File

Uses the PUT request method to change a project file for the given
BRAIN. You cannot PUT new file contents while a BRAIN is training.

### Request

`PUT /v1/{userName}/[brainName]/?file={fileName}`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |
| fileName | name of the file to be changed

#### Headers

| Header | Value |
| Content‐Type | text/x-inkling or otherwise|
| Content‐Length | size of file in bytes |

#### Body

The text of the file.



# Training Mode

## PUT Training Mode

Start or stop training mode.

`PUT /v1/{userName}/{brainName}/train`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |

# Simulators

## GET Simulator Information

> Example Response (JSON)

```json
{
   "name": "breakout",
   "connected": 2,
   "instances": [{
       "state": "ready_to_play".
       "episode": 1
   }]
}
```

Information for a simulator connected to a BRAIN.

### Request

`GET /v1/{userName}/{brainName}/sims`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |

### Response

| Parameter | Description |
| --- | --- |
| name | name of the simulator |
| connected | count of how many simulators are connected |
| instances | array of connected simulators with their status and episode count |

## GET Websocket

Upgrade to a Websocket.

### Request

`GET /v1/{userName}/{brainName}/sims/ws`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |

#### Headers

| Header | Value |
| --- | --- |
| Upgrade | websocket |
| Connection | upgrade |

### Response

[//]: # (Need to add an Example JSON Response code sample and parameter table)

#### Headers

| Header | Value |
| --- | --- |
| Upgrade | websocket |
| Connection | upgrade |

# Websocket Messages

[//]: # (This section and below need to be fleshed out with content on websockets and protobuf messages)

## Training Protocol

![Training Message Protocol](../images/training.svg)

## Prediction Protocol
![Prediction Message Protocol](../images/prediction.svg)

## Simulator to Server

```proto
message SimulatorToServer {
    enum MessageType {
        UNKNOWN = 0;
        REGISTER = 1;
        READY = 2;
        STATE = 3;
    }
    MessageType message_type = 1;

    // Nested message data. Which of these fields is populated depends
    // upon the message type. Some message types do not have any
    // additional data.
    RegisterData register_data = 2;
    repeated SimulationSourceData state_data = 3;
    fixed32 sim_id = 4;
}
```

## Register

```proto
message RegisterData {
    string simulator_name = 1;
}
```

## State

```proto
message SimulationSourceData {
    bytes state = 1;
    float reward = 2;
    bool terminal = 3;
    bytes action_taken = 4;
}
```

## Server to Simulator

```proto
message ServerToSimulator {
    enum MessageType {
        UNKNOWN = 0;
        ACKNOWLEDGE_REGISTER = 1;
        SET_PROPERTIES = 2;
        START = 3;
        STOP = 4;
        PREDICTION = 5;
        RESET = 6;
        FINISHED = 7;
    }
    MessageType message_type = 1;

    // Nested message data. Which of these fields is populated depends
    // upon the message type. Some message types do not have any
    // additional data.
    AcknowledgeRegisterData acknowledge_register_data = 2;
    SetPropertiesData set_properties_data = 3;
    repeated PredictionData prediction_data = 4;
}
```

## Acknowledge Register

```proto
message AcknowledgeRegisterData {
    google.protobuf.DescriptorProto properties_schema = 1;
    google.protobuf.DescriptorProto output_schema = 2;
    google.protobuf.DescriptorProto prediction_schema = 3;
    fixed32 sim_id = 4;
}
```

## Set Properties

```proto
message SetPropertiesData {
    bytes dynamic_properties = 1;
    string reward_name = 2;
    google.protobuf.DescriptorProto prediction_schema = 3;
}
```

## Prediction

```proto
message PredictionData {
    bytes dynamic_prediction = 1;
}
```

# BRAIN Versions and Modes

## BRAIN Versions

BRAIN versions numerically count up as BRAINs are trained.

## BRAIN Modes

BRAIN versions have the following modes:

* **ready_to_train:** After Inkling is uploaded and successfully compiled, the
BRAIN version number is incremented. That particular version is in the
ready_to_train state. ready_to_train versions give predictions the same as or
worse than random.
* **training:** After the train command is given, the BRAIN version is
incremented and that version is in the training state. In this state the user
cannot load new Inkling into the BRAIN or restart training. The user must
cancel training to upload new Inkling.
* **trained:** If training is cancelled or completes the BRAIN version is in
the trained state. Trained BRAIN versions can give predictions or receive more
training. version is NOT incremented upon training completion.
