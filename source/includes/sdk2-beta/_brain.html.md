# Brain Class

Manages a BRAIN instance, talks with the server backend, and contains
information about the BRAIN state. In future versions will be used to upload and download Inkling
to and from the BRAIN on the server.

Requires a `Config` and a BRAIN name.

## Brain(config, name)

Creates a local object for interacting with an existing BRAIN on the server.

- `config` Shared pointer to previously created `bonsai::Config`.
- `name`   BRAIN name as specified on the server. If name is empty, the
            BRAIN name in `config` is used instead.

## update()

Refreshes local state information with information from the current state of the BRAIN on the server

## bool ready()
Returns true if the BRAIN is ready to run for training or prediction.
A BRAIN may not be ready if it has no uploaded inkling files or is configured incorrectly.

## start()
Instructs the server to start training this BRAIN.

## stop()
Instructs the server to stop training this BRAIN.

## string name()
Returns the name of the BRAIN as specified when it was created.

## string description()
Returns the user-provided description for the BRAIN.

## int version()
Returns the version number of the BRAIN

## int latest_version()
Returns latest version number of the BRAIN

## Config config()
Returns the configuration used to talk to this BRAIN.

## operator<<(ostream, brain)

Prints out a representation of Brain that is useful for debugging.

