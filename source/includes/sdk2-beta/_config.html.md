# Config Class

Manages bonsai configuration environments.
Config files can be specified in the user home directory
or in a local directory. Configuration parameters can also be parsed from
the command line.

Example `~/.bonsai` config file:
    
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

The `profile` key can be used to switch between different profiles in
one configuration file.

## Config(profile)

Constructs a default configuration.
`profile` is the name of the default profile. Default value is an empty string.

Configurations are stored in `~/.bonsai` and `./.bonsai` configuration files.
The local configuration file overrides settings in the configuration file in the user home directory.
    
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

## Config(argc, argv, profile)

Constructs a config by looking in the configuration files and parsing the command line arguments.
In Python, `argc` is not necessary.

Arguments:

- `argc` ...as passed to `int main(int argc, char** argv)`.
- `argv` ...same.
- `profile` Name of the default profile.

Example command line arguments:

- `--accesskey=00000000-1111-2222-3333-000000000001`
- `--username=admin`
- `--url=http://localhost:32802`

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

Brain version.
The version of the brain to use when running for prediction. Set to 0 to use latest version

## recording_file()

Simulator log file path. 

Path to a file for simulator logging. If you are implementing a simulator you can use this to specify a log file in a simulator-specific nature. 
Implementation is left for the simulator to do as an exercise.

## operator<<(ostream, config)

Will print out a representation of Config that is useful for debugging.

