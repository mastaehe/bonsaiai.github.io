# Install bonsai-ai for Python

## Install with pip

Blurb about using a virtual env of your choice

> Python 3+ Install

```shell
python3 -m venv sdk2
source sdk2/bin/activate
pip3 install bonsai-ai bonsai-gym bonsai-cli
```

> Python 2.7 Install

```shell
virtualenv sdk2
source sdk2/bin/activate
pip install bonsai-ai bonsai-gym bonsai-cli
```

## Install with Anaconda

If you *do not* have Anaconda installed on your system, please follow to the [Install with pip][15] instructions and skip this section.

`conda` is a tool for installing and managing Python and R dependencies. Anaconda includes Python and pip, so all you need to do is install Git if you haven't already. For more information, refer to the [Anaconda website][10].

> Anaconda Install

```shell
conda create -n sdk2 pip
source activate sdk2
pip install bonsai-ai bonsai-gym bonsai-cli
```

Here is the sequence of commands for installing bonsai-ai and related components. (NOTE: `bonsai-gym` depends on `bonsai-ai` and so installing gym will bring in ai too.)


