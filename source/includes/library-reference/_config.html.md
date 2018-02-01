# Config Class

> Example `~/.bonsai` file

```ini
[DEFAULT]
username = admin
accesskey = None
profile = dev

[dev]
url = http://localhost:5000
username = admin
accesskey = 00000000-1111-2222-3333-000000000001
```

Manages Bonsai configuration environments.
Config files can be specified in the user home directory, `~/.bonsai`,
or in a local directory. Configuration parameters can also be parsed from
the command line.

The `profile` key can be used to switch between different profiles in
one configuration file.

## Config(profile)

```python
config = Config(sys.argv)
print(config)
```

```cpp
int main(int argc, char** argv) {
    auto config = Config(argc, argv);
    std::cout << config << std::endl;
}
```

Constructs a default configuration.

| Argument | Description |
| ---      | ---         |
|`profile` | Name of the default profile. Default value is an empty string. |

Configurations are stored in `~/.bonsai` and `./.bonsai` configuration files.
The local configuration file overrides settings in the configuration file in the user home directory.

## Config(argc, argv, profile)

> Example arguments

```
--help
--accesskey=00000000-1111-2222-3333-000000000001
--username=admin
--url=http://localhost:32802
```

Constructs a config by looking in the configuration files and parsing the command line arguments.

**Note:** In Python, `argc` is not necessary.

| Argument  | Description |
| ---       | ---         |
| `argc`    | As passed to main(). (C++)|
| `argv`    | As passed to main(). (C++/Python)|
| `profile` | Name of the default profile.|

Unrecognized arguments will be ignored.

## accesskey()

Server authentication token.
Obtained from the bonsai server. You need to set it in your config.

## username()

Account user name.
The account you signed up with.

## url()

Server URL.
Address and port number of the bonsai server. Normally you should not need to change this.

## proxy()

Proxy Server.
Address and port number of the proxy server to connect through.

## brain()

BRAIN name.
Name of the BRAIN on the server.

## predict()

Simulator mode.
The mode in which simulators will run. True if running for prediction, false for training.

## brain_version()

BRAIN version.
The version of the brain to use when running for prediction. Set to 0 to use latest version

## recording_file()

Simulator log file path. 

Path to a file for simulator logging. If you are implementing a simulator you can use this to specify a log file in a simulator-specific nature. 
Implementation is left for the simulator to do as an exercise.

## operator<<(ostream, config)

Will print out a representation of Config that is useful for debugging.

**Note:** Used in C++ only.

| Argument  | Description |
| ---       | ---         |
| `ostream` | A std c++ stream operator. |
| `config`  | Object returned by previously created `Bonsai::Config`. |

