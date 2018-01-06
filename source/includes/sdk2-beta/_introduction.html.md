# Library Overview

<aside class="warning">
This documentation is for a beta release of sdk2. If you have any issues please contact support or your sales representative.
</aside>

The Python library wraps the Bonsai API to simplify the process of building simulators
in C++ and Python programming languages. The Python library is generated from the C++
library so for this beta version of documentation you may see some naming inconsistencies.
This library is compatible with Python 3+ only with MacOS and Linux operating systems.
Windows support will be available for the public release.

When the AI Engine trains with the simulator it works in a loop. First, the
simulator connects and registers itself with the AI Engine. Then, the simulator
sends the AI Engine a state and the value of any objectives or rewards; next,
the AI Engine replies with an action. The simulator then uses this action to
advance the simulation and compute a new state. This "send state, receive
action" process is repeated until training stops.  At any time the AI engine
may stop, reconfigure, and reset the simulator.  After doing so it will either
restart this training loop or stop training.  A single state, action, next state,
loop is sometimes referred to as an "iteration".