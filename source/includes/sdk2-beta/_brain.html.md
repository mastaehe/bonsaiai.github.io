# Brain Class

Used to manage a BRAIN instance and talk with the server backend. Contains
state information about the BRAIN and can be used to upload/download inkling
to and from the BRAIN on the server.

Requires a shared pointer to a `bonsai::Config` and a BRAIN name.

## Brain(config, name)

Construct a BRAIN using an existing configuration and BRAIN name.

- `config` Shared pointer to previously created `bonsai::Config`.
- `name`   BRAIN name as specified on the server. If name is empty the
            BRAIN name in `config` will be used instead.

## setup()

Checks the `config()` and starts up a BRAIN for training if running in training mode.
Stops a BRAIN running for training mode if requested for prediction and the version is the latest.

## update()

Retrieves current state information about the BRAIN from the server

## bool ready()
Returns true if the BRAIN is ready to run for training or prediction.
A BRAIN may not be ready if it has no uploaded inkling files or is configured incorrectly.

## start()
Instructs the server to start training for this BRAIN.

## stop()
Instructs the server to stop training for this BRAIN.

## string name()
Returns the name of the BRAIN as specified when it was created.

## string description()
Returns the user created description for the BRAIN.

## int version()
Returns version number of the BRAIN

## Config config()
Configuration used to talk to this BRAIN.

