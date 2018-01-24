# Commands

[//]: # (How do we want to standardize shell output vs. input? Either could go right/left pane.)
[//]: # (The help text and the description text are currently super redundant.)

> Help Text

```
bonsai --help
Usage: bonsai [OPTIONS] COMMAND [ARGS]...

  Command line interface for the Bonsai Artificial Intelligence Engine.

Options:
  --debug / --no-debug  Enable/disable verbose debugging output.
  --version             Show the version and check if bonsai is up to date.
  -h, --help            Show this message and exit.

Commands:
  configure  Authenticate with the BRAIN Server.
  create     Create a BRAIN and set the default BRAIN.
  delete     Delete a BRAIN.
  download   Downloads all the files related to a BRAIN.
  help       Show this message and exit.
  list       Lists BRAINs owned by current user.
  log        Display logs from remote training.
  pull       Downloads project file(s) from a BRAIN.
  push       Uploads project file(s) to a BRAIN.
  sims       Retrieve information about simulators.
  switch     Change the active configuration section.
  train      Start and stop training on a BRAIN.
```

Use `bonsai COMMAND --help` to get information about a specific command. You can use `bonsai --help` to view a list of options for COMMAND.

## bonsai configure

```
$ bonsai configure --help
Usage: bonsai configure [OPTIONS]

  Authenticate with the BRAIN Server.

Options:
  --key TEXT  Provide an access key.
  -h, --help  Show this message and exit.
```

`bonsai configure` sets up authentication between you (as a user) and the server. This enables the server to verify that you are allowed to write Inkling code to a specific BRAIN.

You can find your access key at [https://beta.bons.ai/accounts/key](https://beta.bons.ai/accounts/key).

## bonsai create

```
$ bonsai create --help
Usage: bonsai create [OPTIONS] BRAIN_NAME

  Creates a BRAIN and sets the default BRAIN for future commands.

Options:
  --project TEXT       Override to target another project directory.
  --project-type TEXT  Specify to download and use demo/starter project files
                       (i.e. "demos/cartpole")
  -h, --help           Show this message and exit.
```

`bonsai create` generates a new brain and names it BRAIN_NAME.  It also sets the assumed BRAIN name for later commands.

BRAIN names may include (case insensitive, but case aware):

* letters
* numbers
* dashes

If you'd like to use one of our pre-populated projects, you may run `bonsai create --project-type TEXT` in an empty directory where `TEXT` is any of the following projects:

* `demos/cartpole`
* `demos/mountain-car`
* `templates/starter-project`

## bonsai delete

```
$ bonsai delete --help
Usage: bonsai delete [OPTIONS] BRAIN_NAME

  Deletes a BRAIN. A deleted BRAIN cannot be recovered. The name of a
  deleted BRAIN cannot be reused.

Options:
  -h, --help  Show this message and exit.
```

`bonsai delete` deletes a BRAIN and its associated data from the Bonsai platform. Once a BRAIN is deleted, its data cannot be recovered, and its name cannot be reused.

## bonsai download

```
$ bonsai download --help
Usage: bonsai.py download [OPTIONS] BRAIN_NAME

  Downloads all the files related to a BRAIN.

Options:
  -h, --help  Show this message and exit.
```

`bonsai download` creates local copies of your BRAIN project files. This will contain your Inkling code and may also contain simulator code. This command works like git clone - it copies files into a new directory, and will not try and overwrite files that already exist.

## bonsai list

```
$ bonsai list --help
Usage: bonsai list [OPTIONS]

  Lists BRAINs owned by current user or by the user under a given URL.

Options:
  -h, --help  Show this message and exit.
```

`bonsai list` shows you the BRAINs you currently own or by a user under a given URL. You must have your Bonsai account configured with `bonsai configure` before you can see this list.

## bonsai log

```
$ bonsai log --help
Usage: bonsai log [OPTIONS]

  Displays last 1000 lines of the running simulator's output.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  --follow        Continually follow simulator's output.
  -h, --help      Show this message and exit.
```

Displays *stderr* and *stdout* from the currently running simulator. This will display the last 1000 lines of the running simulator's output. You can override the BRAIN you want to log if multiple are running at the same time or the project.

This command is meant for simulators running remotely on Bonsai's servers using `bonsai train start --remote`. Simulators running locally will generally output this information at the command prompt.

If `bonsai log --follow` is used, then display will update when new logs exist.  Use `Ctrl-c` to stop this command.

## bonsai pull

```
$ bonsai pull --help
Usage: bonsai pull [OPTIONS]

  Downloads project file(s) from a BRAIN.

Options:
  --all         Option to pull all files from targeted BRAIN.
  --brain TEXT  Override to target another BRAIN.
  -h, --help    Show this message and exit.
```

`bonsai pull` will ask you one by one whether you would like to download the specified file. You can respond with [Y/n] to the prompt for each file in the BRAIN's project. If you would like to automatically download all of the files from the BRAIN then `bonsai pull -all` will update all files without asking you which ones to download.

## bonsai push

```
$ bonsai push --help
Usage: bonsai push [OPTIONS]

  Uploads project file(s) to a BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  -h, --help      Show this message and exit.
```

`bonsai push` will upload the entire project file contents and all accompanying files to the Bonsai AI Engine and can be viewed on [beta.bons.ai](https://beta.bons.ai). You can override the BRAIN you want to push to or the project directory you want to push.

## bonsai sims list

```
$ bonsai sims list --help
Usage: bonsai sims list [OPTIONS]

  List the simulators connected to the BRAIN server.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  -h, --help      Show this message and exit.
```

`bonsai sims list` shows you all of the simulators you have connected to the BRAIN server.

## bonsai train

```
$ bonsai train --help
Usage: bonsai train [OPTIONS] COMMAND [ARGS]...

  Start and stop training on a BRAIN, as well as get training status information.

Options:
  -h, --help  Show this message and exit.

Commands:
  start   Trains the specified BRAIN.
  status  Gets training status on the specified BRAIN.
  stop    Stops training on the specified BRAIN.
```

`bonsai train` has no functionality itself. It will output the help to guide you to start, status, or stop training.

## bonsai train start

```
$ bonsai train start --help
Usage: bonsai train start [OPTIONS]

  Trains the specified BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  --remote        Run a simulator remotely on Bonsai’s servers.
  -h, --help      Show this message and exit.
```

`bonsai train start` turns on/enables training mode for the current BRAIN. The BRAIN trains whenever a simulator is connected.

When training locally, if the simulator is disconnected, the BRAIN remains in training mode, and it will train again where it left off when the simulator is reconnected up to an hour after being disconnected.

If `bonsai train start --remote` is used, then the simulator will run remotely on Bonsai's servers for supported simulators.

## bonsai train stop

```
$ bonsai train stop --help
Usage: bonsai train stop [OPTIONS] BRAIN_NAME

  Stops training on the specified BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  -h, --help      Show this message and exit.
```

`bonsai train stop` turns off training mode for the current BRAIN.

## bonsai train status

```
$ bonsai train status --help
Usage: bonsai train status [OPTIONS]

  Gets training status on the specified BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --json          Output status as json.
  --project TEXT  Override to target another project directory.
  -h, --help      Show this message and exit.
```

`bonsai train status` is used to see the current training status of your BRAIN.
