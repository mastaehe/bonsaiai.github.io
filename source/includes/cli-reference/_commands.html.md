# Commands

> Help Text

```
bonsai --help
Usage: bonsai [OPTIONS] COMMAND [ARGS]...

  Command line interface for the Bonsai Artificial Intelligence Engine.

Options:
  --debug / --no-debug  Enable/disable verbose debugging output.
  --version             Show the version and check if bonsai is up to date.
  --sysinfo             Show system information.
  --timeout INTEGER     Set timeout for CLI API requests.
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

### How to use timeout

`bonsai --timeout [INTEGER] [COMMAND]`

Example:
`bonsai --timeout 10 list`

**Note:** Order matters because it is a top level command. The following would not work: 
`bonsai list --timeout 10`

## bonsai configure

```
$ bonsai configure --help
Usage: bonsai configure [OPTIONS]

  Authenticate with the BRAIN Server.

Options:
  --username TEXT    Provide username.
  --access_key TEXT  Provide an access key.
  --show      Prints active profile information.
  -h, --help  Show this message and exit.
```

`bonsai configure` sets up authentication between you (as a user) and the server. This enables the server to verify your access to write Inkling code to a specific BRAIN.

You can find your access key at [https://beta.bons.ai/accounts/settings/key][2].

## bonsai create

```
$ bonsai create --help
Usage: bonsai create [OPTIONS] BRAIN_NAME

  Creates a BRAIN and sets the default BRAIN for future commands.

Options:
  --project TEXT       Override to target another project directory.
  --project-type TEXT  Specify to download and use demo/starter project files
                       (e.g. "demos/cartpole").
  --json               Output json.              
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
Usage: bonsai download [OPTIONS] BRAIN_NAME

  Downloads all the files related to a BRAIN.

Options:
  -h, --help  Show this message and exit.
```

`bonsai download` creates local copies of your BRAIN project files. This will contain your Inkling code and may also contain simulator code. This command works like git clone - it copies files into a new directory, and will not try and overwrite files that already exist.

## bonsai list

```
$ bonsai list --help
Usage: bonsai list [OPTIONS]

  Lists BRAINs owned by current user.

Options:
  --json      Output json.
  -h, --help  Show this message and exit.
```

`bonsai list` shows you the BRAINs on your account. You must have your Bonsai account configured with `bonsai configure` before you can see this list.

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

Displays *stderr* and *stdout* from the current running simulator. This will display the last 1000 lines of the running simulator's output. You can override the BRAIN you want to log if multiple are running at the same time or the project.

This command is meant for simulators running remotely on Bonsai's servers using `bonsai train start --remote`. Simulators running locally will generally output this information at the command prompt.

If using `bonsai log --follow` then display will update when new logs exist.  Use `Ctrl-c` to stop this command.

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

`bonsai pull` asks you one by one whether you would like to download the specified file. You can respond with [Y/n] to the prompt for each file in the BRAIN's project. If you would like to automatically download all files from the BRAIN then `bonsai pull -all` will update all files without asking you which ones to download.

## bonsai push

```
$ bonsai push --help
Usage: bonsai push [OPTIONS]

  Uploads project file(s) to a BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory
  --json          Output json.
  -h, --help      Show this message and exit.
```

`bonsai push` uploads the entire project file contents and all accompanying files to the Bonsai AI Engine and can be viewed on [beta.bons.ai][2]. You can override the BRAIN you want to push to or the project directory you want to push.

## bonsai sims list

```
$ bonsai sims list --help
Usage: bonsai sims list [OPTIONS]

  List the simulators connected to the BRAIN server.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  --json          Output json.
  -h, --help      Show this message and exit.
```

`bonsai sims list` shows you all the simulators you have connected to the BRAIN server.

## bonsai switch

```
$ bonsai switch --help
Usage: bonsai switch [OPTIONS] PROFILE

  Change the active configuration section.

  For new profiles you must provide a url with the --url option.

Options:
  --url TEXT  Set the brain api url.
  --show      Prints active profile information.
  -h, --help  Show this message and exit.
  
Available Profiles:
```

`bonsai switch` changes your current profile to a different configuration as specified in your `.bonsai` file. If you wish to create a new profile you can do so with the `--url` option which creates a configuration you can use again in the future. `bonsai switch` or `bonsai switch -h/--help` will print available profiles.

## bonsai train

```
$ bonsai train --help
Usage: bonsai train [OPTIONS] COMMAND [ARGS]...

  Start and stop training on a BRAIN, as well as get training status
  information.

Options:
  -h, --help  Show this message and exit.

Commands:
  resume  Resume training on the specified BRAIN.
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
  --json          Output json.
  -h, --help      Show this message and exit.
```

`bonsai train start` turns on/enables training mode for the current BRAIN. The BRAIN trains whenever a simulator is connected.

When training locally, if the simulator disconnects, the BRAIN remains in training mode, and it will train again where it left off when the simulator reconnects (up to an hour after being disconnected).

If `bonsai train start --remote` is used, then the simulator will run remotely on Bonsai's servers for [supported simulators][3].

## bonsai train resume

```
$ bonsai train resume --help
Usage: bonsai train resume [OPTIONS]

  Resume training on the specified BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN
  --project TEXT  Override to target another project directory.
  --remote        Resume simulator remotely on Bonsai's servers.
  --json          Output json.
  -h, --help      Show this message and exit.
```

`bonsai train resume` resumes training on an existing trained version of a BRAIN. You can stop and resume a BRAIN as needed.

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

`bonsai train status` gets the current training status of your BRAIN.

## bonsai train stop

```
$ bonsai train stop --help
Usage: bonsai train stop [OPTIONS] BRAIN_NAME

  Stops training on the specified BRAIN.

Options:
  --brain TEXT    Override to target another BRAIN.
  --project TEXT  Override to target another project directory.
  --json          Output json.
  -h, --help      Show this message and exit.
```

`bonsai train stop` stops (or pauses) training on the current BRAIN. You can resume training with `bonsai train resume`.

[1]: https://beta.bons.ai/accounts/settings/key
[2]: https://beta.bons.ai
[3]: ./simulator-reference.html#cloud-hosted-simulators
