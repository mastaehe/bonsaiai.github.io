# Simulator Training Overview

## What is a simulator?

A simulator imitates a real-world situation in a virtual environment, which enables a user to model
and test situations that would often, otherwise be very complicated to set up and test. Your
simulator could be a game, such as Cartpole, or an emulation of a real-world process, such as a
self-driving car. Training with simulators is especially useful for optimization, or for use with
complex control problems that can be modeled in a simulator.

Training means teaching a BRAIN to reach a specific outcome in the simulator. The training involves
using a specific set of concepts, a curriculum, and lessons, which are described in the Inkling file.

Today, we only support simulators written in C++ or Python and have built connectors for simulators
like Simulink, EnergyPlus, and Gazebo. To learn more about writing your own simulator, refer to our [Library Reference][4].

## Currently Supported Simulators

The Bonsai Platform currently supports simulators written in our Python or C++ SDK.

Current available Simulator coordinators:

* OpenAI Gym Environments (bonsai-gym)
* Simulink coder
* Simulink interactive
* EnergyPlus (via BCVTB)

# Running a Simulator Locally

> Python Simulator config help text

```
$ python <simulator_file>.py --help
usage: hw-cartpole.py [-h] [--accesskey ACCESSKEY] [--username USERNAME]
                      [--url URL] [--proxy PROXY] [--brain BRAIN]
                      [--predict [PREDICT]] [--verbose VERBOSE]
                      [--performance PERFORMANCE]

optional arguments:
  -h, --help            show this help message and exit
  --accesskey ACCESSKEY
                        The access key to use when connecting to the BRAIN
                        server. If specified, it will be used instead of any
                        access keyinformation stored in a bonsai config file.
  --username USERNAME   Bonsai username.
  --url URL             Bonsai server URL. The URL should be of the form
                        "https://api.bons.ai"
  --proxy PROXY         Proxy server address and port. Example: localhost:3128
  --brain BRAIN         The name of the BRAIN to connect to. Unless a version
                        is specified the BRAIN will connect for training.
  --predict [PREDICT]   If set, the BRAIN will connect for prediction with the
                        specified version. May be a positive integer number or
                        'latest' for the most recent version. For example:
                        --predict=latest or --predict=3
  --verbose VERBOSE     Enables logging. Alias for --log=all
  --performance PERFORMANCE
                        Enables time delta logging. Alias for --log=perf.all
```

**Note:** Python 3 on macOS will require you use `python3` instead of `python`

## Proxy Support

To connect a simulator from behind a corporate proxy, command line tools like the bonsai sdk need to know where to send traffic. For the bonsai sdk, this is done by providing the proxy server address and port to the simulator config when running a simulator.

## Prediction

After your BRAIN is finished training it can be used to "predict" or perform in the simulation. How well it does depends on how long you let it train! Using your BRAIN involves running your simulator file as you did when training, but now in prediction mode with `--predict`. The default is `--predict=latest` which will use the version of the latest training session that you just ran. You can use a different version of your BRAIN if you have trained it multiple times by replacing `latest` with the version number.

# Cloud Hosted Simulators

`training` is an object.  The `simulator` field of that object
points to a pre-configured simulation container inside the platform. The
`command` field describes the command to run to start the simulator.

Current list of supported simulators for Docker cloud-hosted training:

 * [`openai.gym`][1]
 * [`bonsai.python`][2]
 * [`bonsai.energyplus`][3]


# Running Simulators in Parallel


[1]: https://quay.io/repository/bonsai/gym
[2]: https://quay.io/repository/bonsai/python
[3]: https://quay.io/repository/bonsai/energyplus
[4]: ../references/library-reference.html
