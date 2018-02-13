# Simulator Training

> ![Simulator Diagram](../images/brain-sim-marketing.png)

This guide is intended to give you information and best practices you’ll need to train a BRAIN on The Bonsai Platform with simulators. It covers best practices such as running simulations in parallel, general guidelines like how to use corporate proxies with the CLI, and other tips pertaining to simulators and simulations.

Currently, the Bonsai Platform only uses simulators for applied deep reinforcement learning (DRL). For more background on applied DRL with simulations read our blog post on [simulations as a training environment][6].

We have simple coordinators for Python & C++, two common languages used in systems modeling. We also have coordinators for Simulink, EnergyPlus and Gazebo. To learn more about connecting your simulator, refer to our [Library Reference][4].

## What is a simulator?

A simulator is a computational model of some external process governed by a field of mathematics. Robotics, industrial automation, supply chain logistics, and structural engineering are all domains which use simulators to test how simplified models of complex problems will behave.

Deep Reinforcement Learning can work with simulated models to train a BRAIN to perform tasks within the modeled system. Tasks can be as simple as "stand this pole upright" to as complex as "learn to walk." 

To be effective, a BRAIN needs to be trained using DRL against a simulated model. The Bonsai SDK allows the DRL system to control your simulator during the training process. Any simulator which has an initial state, and can be incremented through time in a stepwise fashion can be connected to the Bonsai training system.

## Currently Integrated Simulators

The Bonsai Platform currently supports simulators written in our Python or C++ libraries, or through coordinators (bridges/connections) of these languages. The following are also available as coordinators built in-house:

* OpenAI Gym Environments (bonsai-gym)
* Simulink Universal Coordinator
    - Coder
    - Interactive
* EnergyPlus (via BCVTB)

A list of examples using these coordinators can be found on the [Examples][7] page.

# Running a Simulator Locally

> Simulator config help text

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
                        access key information stored in a bonsai config file.
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

During development, you may need to iterate quickly on your simulation, reward function, and lesson plans. You may also need to connect a debugger, or do additional logging to help you get your simulation ready to train. The Bonsai SDK provides a set of capabilities to help the developer iterate quickly on their simulation while running from a local laptop or desktop machine.

The `Config` object has a built in command line parser which can be used to override the local running environment. It comes with a set of standard switches which can be viewed with the `--help` option. The current default configuration is read from environment variables, a `~/.bonsai` configuration file in the user’s home directory, a `./.bonsai` and a `./.brains` configuration file in the current working directory, command line options, and programmatically in code.

During the course of normal operation, one should only need to specify the prediction/training mode on the command line. The rest of the options will be read from configuration files.

One is not limited to launching a single simulator locally. If you have the compute resources, each new simulator will open a new connection to the server and add to the training pool. You can do this on a per process basis, or at the thread level.


## Proxy Support
> Example Python Proxy

```python
my_config.proxy == 'myproxy:5000'
```

> Example CLI Proxy Usage

```shell
$ python <simulator_file>.py --proxy=localhost:3128
```

To connect a simulator from behind a corporate proxy, command line tools like the Bonsai SDK need to know where to send traffic. For the Bonsai SDK, this is done by providing the proxy server address and port to the simulator config when running a simulator. There are multiple ways that you can do this.
## Prediction

```python
# Default version is latest
python <simulator_file>.py --predict

#OR
Python <simulator_file>.py --predict=1
```

After your BRAIN is finished training it can be used to "predict" or perform in the simulation. How well it does depends on how long you let it train! Using your BRAIN involves running your simulator file as you did when training, but now in prediction mode with `--predict`. The default is `--predict=latest` which will use the version of the latest training session that you just ran. You can use a different version of your BRAIN if you have trained it multiple times by replacing `latest` with the version number.

# Cloud Hosted Simulators
There are a couple simulators that the Bonsai Platform can run cloud-hosted (sometimes referred to as platform managed) in a Docker container. This means you can start and stop training all from the web interface, without needing to download and install the Bonsai CLI or SDK. You will still need to run the simulator locally using the CLI to obtain predictions, however.

Cloud-hosted simulators are useful for prolonged training to avoid your computer becoming idle and stopping training. At this time, you can only run one simulator cloud-hosted, and cannot take advantage of training speed increases from [running simulators in parallel][5].

Current list of supported simulators for Docker cloud-hosted training:

* OpenAI Gym environment: [`openai.gym`][1]
* Bonsai Python `bonsai-ai` library: [`bonsai.ai`][10]
* EnergyPlus Simulator: [`bonsai.energyplus`][3]
* Legacy `bonsai-python` library: [`bonsai.python`][2]

In order to set your BRAIN to use one of these cloud-hosted simulators, you’ll need to modify your BRAIN’s [project (`.bproj`) file][8] if you aren’t already using one of the Bonsai demo projects.

# Running Simulations in Parallel

> ![Parallel Simulators](../images/multiple-sims.png)

Training can take a long time. Depending on the complexity of the problem and they way your lesson plans are written, training can take several hours to several days. Fortunately, training can happen in parallel. Each new simulator you connect to a running training session will increase the Episodes/Sec training rate which will help the BRAIN find better solutions faster. How much you can increase training depends on the speed of your simulation: if you simulation takes 1s per iteration, you will get benefits running dozens

Running simulations in parallel is currently only supported when running your simulator locally. Simply connect multiple instances of your simulation to the same BRAIN to take advantage of this feature.


[1]: https://quay.io/repository/bonsai/gym
[2]: https://quay.io/repository/bonsai/python
[3]: https://quay.io/repository/bonsai/energyplus
[4]: ../references/library-reference.html
[5]: #running-simulators-in-parallel
[6]: https://bons.ai/blog/simulators-deep-reinforcement-learning
[7]: ../examples.html
[8]: ../references/cli-reference.html#bproj-file
[9]: ../references/library-reference.html#proxy
[10]: https://quay.io/repository/bonsai/bonsai-ai
