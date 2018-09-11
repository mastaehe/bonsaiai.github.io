# SDK Overview

```powershell
###########################################################
# Windows specific command prompt instructions shown here #
###########################################################
```

```shell--macos
#########################################################
# macOS specific command prompt instructions shown here #
#########################################################
```

```shell--ubuntu
#########################################################
# Ubuntu specific command prompt instructions shown here #
#########################################################
```


The Bonsai SDK is made up of a command line interface for interacting with and controlling BRAINs, a library for connecting simulations to a brain for training or predictions, and examples of simulators connecting to BRAINs. Bonsai libraries known as `libbonsai` (C++) and `bonsai-ai` (Python) wrap the Bonsai API to simplify the process of building simulators in C++ and Python programming languages. `bonsai-ai` is compatible with Python 2.7+ on Windows 7/10, macOS, and Linux. `libbonsai` is compatible with Windows, macOS, and Ubuntu 16.04+.

If installing `bonsai-ai` it is strongly suggested that you first follow our guide to [Install the CLI][1] so you can be sure to have any Python prerequisites already installed. Using `libbonsai` requires Microsoft Visual C++ 15 2017.

[1]: ./cli-install-guide.html