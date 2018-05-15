# Different Types of Simulator Patterns

The are many different kinds of simulators, but roughly speaking, they can be integrated into the Bonsai platform in the following ways:

### Stand-alone Application

*Example: [Find the Center][1]*

A Standalone application contains a model, simulator, simulator connector and other support code necessary to train a BRAIN against the model. It’s great when you’re first learning, or writing your own simulator and model from scratch.

* A good model for learning.
* Has everything in one place.

Subclass from `Simulator`, and put the simulation model reset code in `episode_start()`. Step the simulation model in `simulate()`. Wrap up simulation episode in `episode_finish()`.


### Stand-alone Application w/ Simulation Framework

*Example: [Cartpole + OpenAI Gym][2]*

If your simulator & model are coming from another framework and you instantiate them as a class, this pattern is good for integrating a framework with the platform.

* You have a existing simulation framework which runs a model.
* Separates the AI teaching from simulation code.

Subclass from `Simulator`, instantiate the simulation model in `episode_start()`, step the simulation and translate to/from inkling into simulation frameworks parameter formats in `simulate()`. Clean up and destroy simulation model in `episode_finish()`.

### Plug-in
*Example: [Simulink][3]*

If your simulation environment is a standalone application that can load plugins and those plugins can link C++ or Python code, you may be able to integrate as a Simulator Plugin.

* Write a simulator platform plugin
* Use `Simulator::get_next_event()` and take appropriate action.

### Bridge
*Example: Unity, [EnergyPlus][4]*

Use a bridge model when your Simulation environment is already in a self contained application and you’re unable to instantiate a `Simulator` class within it. The application will have to have some sort of mechanism for communicate state outward at each step of the simulation model. It also useful when you have a Plug-in environment that doesn’t integrate smoothly with the `Simulator` class.

* Dependant on getting messages into/out of the simulator environment
* The separate bridge application will act as a mini server to translate simulation environment messages into bonsai messages.

[1]: ./examples.html#basic-python-c-simulation
[2]: ./examples.html#openai-gym-cartpole
[3]: ./examples.html#simulink-examples
[4]: ./examples.html#energyplus-hvac-optimization