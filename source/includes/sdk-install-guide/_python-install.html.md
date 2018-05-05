# Install bonsai-ai for Python

Here is the sequence of commands for installing bonsai-ai and related components. (NOTE: `bonsai-gym`
depends on `bonsai-ai` and so installing gym by itself will bring in `bonsai-ai` too.)

Do **ONE** of the following:

* [Install with pip][1]
* [Install with Anaconda][4]

See the [Python Library Reference][5] for full details on usage of this library.

## Install with pip

> Python 3+ Install

```powershell
# Optional to install within a virtual environment
python -m venv sdk2
cd sdk2/Scripts
.\activate

pip install bonsai-ai bonsai-gym bonsai-cli
```

```shell
# Optional to install within a virtual environment
python3 -m venv sdk2
source sdk2/bin/activate

pip3 install bonsai-ai bonsai-gym bonsai-cli
```

> Python 2.7 Install

```powershell
# Optional to install within a virtual environment
virtualenv sdk2
cd sdk2/Scripts
.\activate

pip install bonsai-ai bonsai-gym bonsai-cli
```

```shell
# Optional to install within a virtual environment
virtualenv sdk2
source sdk2/bin/activate

pip install bonsai-ai bonsai-gym bonsai-cli
```

It it highly recommended that you use the Python SDK with a virtual environment of your choice.
In the code panel we show [virtualenv][3] being used but you can replace this with one of your choice or
leave it out and pip install directly into your system if you wish.

## Install with Anaconda

> Anaconda Install

```powershell
# Optional to install within a virtual environment
conda create -n sdk2 pip
source activate sdk2

pip install bonsai-ai bonsai-gym bonsai-cli
```

```shell
# Optional to install within a virtual environment
conda create -n sdk2 pip
source activate sdk2

pip install bonsai-ai bonsai-gym bonsai-cli
```

If you *do not* have Anaconda installed on your system, please follow to the [Install with pip][1]
instructions and skip this section.

`conda` is a tool for installing and managing Python and R dependencies, as well as virtual python
environments. For more information, refer to the [Anaconda website][2].


[1]: #install-with-pip
[2]: https://www.anaconda.com/download/
[3]: https://packaging.python.org/guides/installing-using-pip-and-virtualenv/
[4]: #install-with-anaconda
[5]: ../references/library-reference.html?python