# API Overview

```
#####################################################
# JSON output will be shown here for REST API       #
# protobuf output will be shown here for Websockets #
#####################################################
```

The Bonsai Platform provides programmers and data scientists with a new way of
building sophisticated ML and AI applications. This API is at the core of how
programmers interact with the AI Engine.

The Bonsai BRAIN API has two feature areas:

* Managing BRAINS
* Connecting simulators for training and use.

The root for all Bonsai Platform API requests is [https://api.bons.ai]().

# Authentication

To make an API call, you must include an `Authorization` header for the request
to succeed. The value of this header should be your access key. This can be found
[on BRAIN web in your Account Settings](https://beta.bons.ai/accounts/key).

#### Headers

| Header | Value |
| --- | --- |
| Authorization | Access key |

# User and BRAIN Status

## GET User Status

List all BRAINs owned by the user.

### Request

`GET /v1/{userName}`

| Parameter | Description |
| --- | --- |
| userName | Name of the user |

> Example JSON Response

```json
{
   "brains":  [{
      "url": "/v1/kgmcauliffe/Cartpole",
      "version": 0,
      "last_modified": "2017-04-19T00:19:46.857000Z",
      "state": "Not Started",
      "name": "Cartpole"
    },
    {
      "url": "/v1/kgmcauliffe/MountainCar",
      "version": 6,
      "last_modified": "2017-03-21T18:33:17.676000Z",
      "state": "Complete",
      "name": "MountainCar"
    },
    {
      "url": "/v1/kgmcauliffe/Starter",
      "version": 2,
      "last_modified": "2017-04-24T21:36:44.740000Z",
      "state": "In Progress",
      "name": "Starter"
    }]
}
```

### Response

| Parameter | Description |
| --- | --- |
| url | URL of the BRAIN |
| version | Current version number of the BRAIN |
| last_modified | Text string of last modified date |
| state | Current status of training |
| name | Name of the BRAIN |

## GET BRAIN Status

Get information about a BRAIN. This will return every URL for
every version of that BRAIN as well.

### Request

`GET /v1/{userName}/{brainName}`

| Parameter | Description |
| --- | --- |
| userName | Name of the user who has the BRAIN |
| brainName | Name of the BRAIN |

> Example JSON Response

```json
{
  "versions": [
    {
      "url": "/v1/kgmcauliffe/Starter/2",
      "version": 2
    },
    {
      "url": "/v1/kgmcauliffe/Starter/1",
      "version": 1
    }
  ],
  "description": "Basic example project.",
  "user": "kgmcauliffe",
  "name": "Starter"
}
```

### Response

| Parameter | Description |
| --- | --- |
| version | Current version number of the BRAIN |
| description | Text description of the BRAIN |
| user | Name of the user who has the BRAIN|
| name | Name of the BRAIN |


# Project Files

## GET File

Get the contents of a specified project file, for example, the Inkling
code in the *.ink* file for a BRAIN.

### Request

`GET /v1/{userName}/[brainName]?file={fileName}`

| Parameter | Description |
| --- | --- |
| userName | Name of the user who has the BRAIN |
| brainName | Name of the BRAIN |
| fileName | Full name of the file to get |

### Response

The full text of the file will be returned in the body.

## PUT File

Uses the PUT request method to change a project file for the given
BRAIN. You cannot PUT new file contents while a BRAIN is training.

### Request

`PUT /v1/{userName}/[brainName]?file={fileName}`

| Parameter | Description |
| --- | --- |
| userName | Name of the user who has the BRAIN |
| brainName | Name of the BRAIN |
| fileName | Name of the file to be changed |

#### Headers

| Header | Value |
| --- | --- |
| Content‐Type | Set to `text/x-inkling` or `text/plain` if not Inkling code|
| Content‐Length | Size of file in bytes |

> Example JSON Response

```json
{
  "success": true,
  "errors": [],
  "compiler_version": "1.8.25",
  "warnings": []
}
```

### Response

| Parameter | Description |
| --- | --- |
| success | Whether the Inkling code was compiled successfully |
| errors | Compiler errors will be listed if there are any |
| compiler_version| Version of the compiler used |
| warnings |  Compiler warnings will be listed if there are any |

This is an example response for an Inkling file with no errors or warnings to report.

# Training Mode

## PUT Training Mode

Start or stop training mode.

### Request

`PUT /v1/{userName}/{brainName}/train`

| Parameter | Description |
| --- | --- |
| userName | Name of the user who has the BRAIN |
| brainName | Name of the BRAIN |

> Example JSON Response

```json
{
  "user": "kgmcauliffe",
  "simulator_connect_url": "/v1/kgmcauliffe/Starter/sims/ws",
  "name": "Starter",
  "simulator_predictions_url": "/v1/kgmcauliffe/Starter/1/predictions/ws",
  "version": 1,
  "manage_simulator": false,
  "compiler_version": "1.8.25",
  "brain_url": "/v1/kgmcauliffe/Starter/1"
}
```

### Response

| Parameter | Description |
| --- | --- |
| user | Name of the user who has the BRAIN |
| simulator_connect_url | URL the simulator connects to for training |
| name | Name of the BRAIN |
| simulator_predictions_url | URL the simulator connects to for prediction |
| version | Current version number of the BRAIN |
| manage_simulator | Whether or not the simulator is managed |
| compiler_version| Version of the compiler used |
| brain_url | URL of the BRAIN |

# Simulators

## GET Simulator Information

Information for a simulator connected to a BRAIN.

### Request

`GET /v1/{userName}/{brainName}/sims`

| Parameter | Description |
| --- | --- |
| userName | Name of the user who has the BRAIN |
| brainName | Name of the BRAIN |

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

### Response

| Parameter | Description |
| --- | --- |
| name | Name of the simulator |
| connected | Count of how many simulators are connected |
| instances | Array of connected simulators with their status and episode count |



# Websocket Messages

[//]: # (This section and below need to be fleshed out with content on websockets and protobuf messages)

The simulator and AI Engine exchange messages in a binary protocol for training
and prediction.

## Training Protocol

Connect to the server and upgrade to a websocket to initialize the training
protocol.

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

### Protocol

![Training Message Protocol](../images/training.svg)

## Prediction Protocol

Connect to the server and upgrade to a websocket to initialize the prediction
protocol.

### Request

`GET /v1/{userName}/{brainName}/{version}/predictions/ws`

| Parameter | Description |
| --- | --- |
| userName | name of the user who has the BRAIN |
| brainName | name of the BRAIN |
| version | version of the BRAIN to get predictions from. Use "latest" for latest version |

#### Headers

| Header | Value |
| --- | --- |
| Upgrade | websocket |
| Connection | upgrade |

### Protocol

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
