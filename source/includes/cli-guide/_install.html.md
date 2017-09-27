# Install Prerequisites

[//]: # (If any commented statements become false, change prior text)

Before you begin, you will need to have access to the Bonsai Platform preview. If you don't have access yet, request access at [bons.ai][1].

The next section walks you through how to install Git, Python, and pip, but if you're already ahead of the curve and **have them all installed**, skip down to [Setup the Bonsai CLI][2]. 

<aside class="notice">
We highly recommend macOS users download Python directly in the Manual Install instructions or use <a href="http://brew.sh/">Homebrew</a> so you can perform the following steps on user-land Python rather than <a href="https://github.com/MacPython/wiki/wiki/Which-Python">system Python</a>.
</aside>

**There are three sets of install instructions, please pick the one that suits your situation:**

1. If you have **Anaconda** installed on your system, skip down to [Install with Anaconda][9].
2. If you have **Chocolatey (Windows)** or **Homebrew (macOS)** installed on your system, skip down to [Install with Chocolatey or Homebrew][7].
3. If you *do not* have Chocolatey, Homebrew, or Anaconda installed on your system continue to follow our **Manual Install** intructions below.

<aside class="notice">
The two tabs to the right allow you to follow this guide as a macOS or Windows user. Instructions also vary slightly between Python 2 and Python 3 so please be sure to follow your version's instructions.
</aside>

## Manual Install

### Windows

* **Git**: Download and install Git from [Git for Windows][11]. 
* **Python**: Download and install Python (3.6 or 2.7) from [python.org][3].

<aside class="warning">
For users installing <b>Python 2.7</b>: Make sure to include adding Python to your PATH when customizing your install on the third screen. <br>
For users installing <b>Python 3.6</b>: Make sure to check the box on the first screen of the install to add Python to your PATH.
</aside>

* **pip**: Python version 2.7.9 and greater come with pip, but if for some reason you need to use a different version of Python please follow [these instructions][12].

<aside class="notice">
Please remember to reboot your computer after installing Python and Git to make sure all install settings take effect.
</aside>

**Great!** Now that you have Git, Python, and pip installed, you can skip down to [Setup the Bonsai CLI][2]. 

### macOS

* **Git**: Git is more than likely already installed on your computer if you have Xcode, but if not, run `git` from your command prompt and the system will prompt you to install.
* **Python**: Download and install Python (3.6 or 2.7) from [python.org][3].

<aside class="notice">
We highly recommend macOS users download Python directly so you can follow this guide on user-land Python rather than <a href="https://github.com/MacPython/wiki/wiki/Which-Python">system Python</a>.
</aside>

* **pip**: Python version 2.7.9 and greater come with pip (or pip3 for version 3+), but if for some reason you need to use a different version of Python please follow [these instructions][12].

**Great!** Now that you have Git, Python, and pip installed, you can skip down to [Install the Bonsai CLI][2]. 

## Install with Chocolatey or Homebrew

If you *do not* have Chocolatey or Homebrew installed on your system, please go to the [Manual Install][15] or [Install with Anaconda][9] instructions.

> Python 2

```powershell
choco install git
choco install python2
```
```shell
brew install python
```

> Python 3

```powershell
choco install git
choco install python
```
```shell
brew install python3
```

### Windows

**If you're already familiar with [Chocolatey][14], follow these instructions.**

<aside class="notice">
Please remember to run choco commands in administrator powershell or command prompt.
</aside>

### macOS

**If you're already familiar with [Homebrew][6], follow these instructions.**

* **Git**: Git is more than likely already installed on your computer if you have Xcode, but if not, run `git` from your command prompt and the system will prompt you to install.
* **Python**: Run the install command on the tab to the right to `brew install` the Python version of your choice.

## Install with Anaconda

```
conda install git
```

If you *do not* have Anaconda installed on your system, please go to the [Manual Install][15] or [Install with Chocolatey or Homebrew][7] instructions.

`conda` is a tool for installing and managing Python and R dependencies. Anaconda includes Python and pip, so all you need to do is install Git if you haven't already. For more information, refer to the [Anaconda website][10].




# Install the Bonsai CLI

> Python 2 and Anaconda

```
pip install bonsai-cli
bonsai configure # for authentication
```

> Python 3

```powershell
# same as above
```
```shell
pip3 install bonsai-cli
bonsai configure # for authentication
```

From your command prompt, install the Bonsai Command Line Interface tool and configure (authenticate) it. [`bonsai configure`][17] will ask for your Access Key. You can find your Access Key in your [Bonsai Account Settings][8].




# Setup Your Project

## Clone a Sample Project

```
git clone https://github.com/BonsaiAI/gym-mountaincar-sample
```

Clone a sample simulation project with `git clone`. For this guide we'll be walking you through [OpenAI Gym's Mountain Car][4] environment, one of the supported Bonsai simulators.

If you wish to experiment with your own project at this stage you can. Your project will need an Inkling (.ink) file and a simulator file. Many other projects can be found on the [BonsaiAI GitHub page][22].

## Install Project Requirements

> Python 2 and Anaconda

```
cd gym-mountaincar-sample
pip install -r requirements.txt
```
> Python 3

```powershell
# same as above
```
```shell
cd gym-mountaincar-sample
pip3 install -r requirements.txt
```

Enter into the Mountain Car folder and then install the Mountain Car requirements from OpenAI Gym with pip.




# Create Your BRAIN

```
bonsai create myMountainCarBrain
```

Create your BRAIN (and its related project file) with [`bonsai create`][18] and give it a name. We used *myMountainCarBrain* in the example code but you can name it whatever you'd like. You will view your BRAIN's training progress on the BRAIN's Details page which can be found on the [BRAIN dashboard][5].

```
bonsai push
```

Use [`bonsai push`][19] to upload the cloned Mountain Car project and its associated files to the Bonsai AI Engine for training.




# Train Your BRAIN

Almost there! Time to tell the Bonsai AI Engine to prepare a new BRAIN version for training. There are currently two options for training a BRAIN, one is to run a simulator remotely using Bonsai's servers, and the other is to run a simulator locally with your own computer.

Simulators which can be trained remotely include EnergyPlus, OpenAI Gym's, and simple simulators all found on our [Examples documentation][23]. If the simulator is not one that we support remotely, you'll need to run it locally.

## Train Remotely

```
bonsai train start --remote
```

Start training your BRAIN with [`bonsai train start --remote`][20].

Remote training is the best way to train BRAINs that need to ran overnight or for multiple days at a time. There is no disconnection of the simulator to the server like there can be when training locally.

## Train Locally

```
bonsai train start
```

> Python 2

```
python mountaincar_simulator.py --train-brain=myMountainCarBrain --headless
```
> Python 3

```powershell
# same as above
```
```shell
python3 mountaincar_simulator.py --train-brain=myMountainCarBrain --headless
```

Start training your BRAIN with [`bonsai train start`][20].

Once you have started training mode it's time to start running your simulator locally by calling Python and then the simulator file. Training will begin automatically and if the simulator gets disconnected, training resumes from the same point when the simulator is reconnected if it's within an hour of the disconnect. If you want your training to take place overnight, make sure that your computer won't go to sleep and disconnect for more than an hour or that training time will be lost!

<aside class="notice">
We use headless here to indicate we don't need to see a graphical display from the simulator; if you'd like to see it and watch the simulator learn, omit this option.
</aside>

## View your BRAIN training status

View your BRAIN's training status as it trains on the simulator by going to the BRAIN's Dashboard page on [beta.bons.ai][5]. Training Mountain Car takes about an hour to get sufficient training to beat the game most of the time. If you want flawless victories each time the simulator can take up to 2 hours before you'll see the graph level out.

![Fully Trained BRAIN][16]

There is no automatic ending to training, you can train forever, but there will be diminishing returns after a couple of hours. You can play around with training for 15 mins, 30 mins, 1 hour, etc and use your BRAIN to see how well it plays each time! It takes about 700 episodes to train the BRAIN correctly. Our ideal target is an average reward of -195 or higher over 100 consecutive episodes.

[//]: # (Update this when we have multiple concepts and smart ending)

## Stop Training

```
bonsai train stop
```

Once we've gotten to this level of performance (or sooner if you prefer), CTRL-C to disconnect the simulator (if you are running it locally), then [`bonsai train stop`][21] will end the training, and proceed to prediction.




# Predict with Your BRAIN

> Python 2

```
python mountaincar_simulator.py --predict-brain=myMountainCarBrain --predict-version=latest
```
> Python 3

```powershell
# same as above
```
```shell
python3 mountaincar_simulator.py --predict-brain=myMountainCarBrain --predict-version=latest
```

After your BRAIN is finished training it can play the Mountain Car game. How well it does depends on how long you let it train! Using your BRAIN involves calling Python on your simulator file, but now in prediction mode with `--predict-version=latest` which will use the version of the latest training session that you just ran.


[1]: http://pages.bons.ai/apply.html
[2]: #install-the-bonsai-cli
[3]: https://www.python.org
[4]: https://gym.openai.com/envs/MountainCar-v0
[5]: https://beta.bons.ai
[6]: http://brew.sh/
[7]: #install-with-chocolatey-or-homebrew
[8]: https://beta.bons.ai/accounts/key
[9]: #install-with-anaconda
[10]: https://www.continuum.io/anaconda-overview
[11]: https://git-for-windows.github.io/
[12]: https://pip.pypa.io/en/stable/installing/
[13]: https://github.com/MacPython/wiki/wiki/Which-Python
[14]: https://chocolatey.org/
[15]: #manual-install
[16]: ../images/fully_trained_brain.png
[17]: ../references/cli-reference.html#bonsai-configure
[18]: ../references/cli-reference.html#bonsai-create
[19]: ../references/cli-reference.html#bonsai-push
[20]: ../references/cli-reference.html#bonsai-train-start
[21]: ../references/cli-reference.html#bonsai-train-stop
[22]: https://github.com/BonsaiAI
[23]: ../examples.html