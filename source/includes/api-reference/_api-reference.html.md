# API Overview

The Bonsai Platform provides programmers and data scientists with a new way of
building sophisticated ML and AI applications. This API is at the core of how
programmers interact with the AI Engine.

The Bonsai BRAIN API has two feature areas:

* Managing BRAINS
* Connecting simulators for training and use.

# Authentication

TBD

# User and BRAIN status

## GET: User status

> Example Response

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
       "id": 2
       "name": "mybrain3",
       "url": "/megan/mybrain3",
       "status": "training",
       "training": "/megan/mybrain3/dev",
       "predictor": "/megan/mybrain3/12"
   }]
}
```

```protobuf
// There is no protobuf version of this response.
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

## GET BRAIN status

> Example Response

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

```protobuf
// There is no protobuf version of this response.
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


# Inkling

## GET Inkling

### Request

`GET /v1/{userName}/{brainName}/{brainVersion}/ink`

Inkling code for a BRAIN.

## POST Inkling

Uses the POST request method to post a new version of the Inkling code for a
BRAIN. You cannot POST new Inkling while a BRAIN is training.

### Request

`POST /v1/{userName}/{brainName}/ink`

#### Headers
| Header | Description |
| --- | --- |

| Content‐Type | text/x‐bonsai‐inkling |
| Content‐Length | size of inkling file in bytes |

#### Body
The text of the Inkling file.


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

> Example Response

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

```protobuf
// There is no protobuf version of this response.
```

Information for a simulator connected to a BRAIN.

### Request

`GET /{userName}/{brainName}/sims`

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

Upgrade to a Websocket

### Request

`GET /V1/{userName}/{brainName}/sims/ws`

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

#### Headers

| Header | Value |
| --- | --- |
| Upgrade | websocket |
| Connection | upgrade |

# Websocket Messages

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
