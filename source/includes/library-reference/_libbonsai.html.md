# Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`define `[`BONSAI_LOG`](#logging_8hpp_1a40386931a6ae3c8c1ea0703ac114a7d5)            | 
`namespace `[`bonsai`](#namespacebonsai) | 
`namespace `[`bonsai::internal`](#namespacebonsai_1_1internal) | 
`struct `[`bonsai::internal::simulator_ws_impl::simstep_t`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t) | 

## Members

#### `define `[`BONSAI_LOG`](#logging_8hpp_1a40386931a6ae3c8c1ea0703ac114a7d5) 

# namespace `bonsai` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::ostream & `[`operator<<`](#namespacebonsai_1a71168ea8a53de0fde5b5cc451b3329d2)`(std::ostream & out,const `[`Brain`](#classbonsai_1_1_brain)` & brain)`            | 
`public ostream & `[`operator<<`](#namespacebonsai_1aa97f07dbf2dd6c53950e4f6b280e06d8)`(ostream & out,`[`Config`](#classbonsai_1_1_config)` const & config)`            | 
`public ostream & `[`operator<<`](#namespacebonsai_1a0d80e2483384e36e58a00fa2b91f0f74)`(ostream & out,`[`Simulator`](#classbonsai_1_1_simulator)` const & config)`            | 
`class `[`bonsai::Brain`](#classbonsai_1_1_brain) | [Brain](#classbonsai_1_1_brain) class
`class `[`bonsai::Config`](#classbonsai_1_1_config) | [Config](#classbonsai_1_1_config) class.
`class `[`bonsai::InklingMessage`](#classbonsai_1_1_inkling_message) | 
`class `[`bonsai::Simulator`](#classbonsai_1_1_simulator) | [Simulator](#classbonsai_1_1_simulator) class.

## Members

#### `public std::ostream & `[`operator<<`](#namespacebonsai_1a71168ea8a53de0fde5b5cc451b3329d2)`(std::ostream & out,const `[`Brain`](#classbonsai_1_1_brain)` & brain)` 

#### `public ostream & `[`operator<<`](#namespacebonsai_1aa97f07dbf2dd6c53950e4f6b280e06d8)`(ostream & out,`[`Config`](#classbonsai_1_1_config)` const & config)` 

#### `public ostream & `[`operator<<`](#namespacebonsai_1a0d80e2483384e36e58a00fa2b91f0f74)`(ostream & out,`[`Simulator`](#classbonsai_1_1_simulator)` const & config)` 

# class bonsai::Brain

[Brain](#classbonsai_1_1_brain) class

Used to manage a brain instance and talk with the server backend. Contains state information about the brain and can be used to upload/download inkling to and from the brain on the server.

Requires a shared pointer to a `[bonsai::Config](#classbonsai_1_1_config)` and a brain name.

### Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  explicit `[`Brain`](#classbonsai_1_1_brain_1aff29a7f60bae1e3df9361e33f1b810cc)`(std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > config,std::string name)` | Construct a brain using an existing configuration and brain name.
`public  `[`Brain`](#classbonsai_1_1_brain_1aca5b0271f74f9361fa7fbfc971468cb7)`(const `[`Brain`](#classbonsai_1_1_brain)` & other)` | 
`public  `[`~Brain`](#classbonsai_1_1_brain_1a29e923160047e554d051467a0f09150e)`()` | 
`public void `[`setup`](#classbonsai_1_1_brain_1a3c249c3c84e69f8eb01e5949f490db74)`()` | Checks the [config()](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504) and starts up a brain for training if running in training mode. Stops a brain running for training mode if requested for prediction and the version is the latest.
`public void `[`update`](#classbonsai_1_1_brain_1a9ab925945caeb2e837cb035fab3e0417)`()` | Retrieves current state information about the brain from the server
`public bool `[`ready`](#classbonsai_1_1_brain_1a431784d251099fbf02290126cfe11cfd)`() const` | Upload a project and associated files to the server for this brain
`public void `[`start`](#classbonsai_1_1_brain_1aab155b06ee17e7076ad3a76ac46eb702)`() const` | Instructs the server to start or stop training for this brain. Necessary to do before a simulator can connect. Returns true if training was successfully started.
`public void `[`stop`](#classbonsai_1_1_brain_1a80f932e60386e75030d416133f81c334)`() const` | 
`public const std::string & `[`name`](#classbonsai_1_1_brain_1aa9dbe90cfe1e8047c22d71a4203978e4)`() const` | Name of the brain as specified when it was created.
`public const std::string `[`description`](#classbonsai_1_1_brain_1aab7e97119f6d864c0ce874e6365e9924)`() const` | Returns the user created description for the brain.
`public inline int `[`version`](#classbonsai_1_1_brain_1a694824eb2724cf6dfa50ad5031db87ab)`() const` | Returns version number of the brain
`public std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > `[`config`](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504)`()` | Configuration used to talk to this brain.

### Members

#### `public  explicit `[`Brain`](#classbonsai_1_1_brain_1aff29a7f60bae1e3df9361e33f1b810cc)`(std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > config,std::string name)` 

Construct a brain using an existing configuration and brain name.

#### Parameters
* `config` shared pointer to previously created [bonsai::Config](#classbonsai_1_1_config). 

* `name` brain name as specified on the server. If name is empty the brain name in config will be used instead.

#### `public  `[`Brain`](#classbonsai_1_1_brain_1aca5b0271f74f9361fa7fbfc971468cb7)`(const `[`Brain`](#classbonsai_1_1_brain)` & other)` 

#### `public  `[`~Brain`](#classbonsai_1_1_brain_1a29e923160047e554d051467a0f09150e)`()` 

#### `public void `[`setup`](#classbonsai_1_1_brain_1a3c249c3c84e69f8eb01e5949f490db74)`()` 

Checks the [config()](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504) and starts up a brain for training if running in training mode. Stops a brain running for training mode if requested for prediction and the version is the latest.

#### `public void `[`update`](#classbonsai_1_1_brain_1a9ab925945caeb2e837cb035fab3e0417)`()` 

Retrieves current state information about the brain from the server

#### `public bool `[`ready`](#classbonsai_1_1_brain_1a431784d251099fbf02290126cfe11cfd)`() const` 

Upload a project and associated files to the server for this brain

#### Parameters
* `project_path` is the path to the project file to upload, along with its related files.

Replace an existing individual file within a project with a new version on the server.

#### Parameters
* `file_path` is the local path to the file to upload 

* `file_project_path` is the path to the file within the project

The remote file must already have been uploaded previously.

Returns true if the brain is ready to run for training or prediction. A brain may not be ready if it has no uploaded inkling files or is configured incorrectly.

#### `public void `[`start`](#classbonsai_1_1_brain_1aab155b06ee17e7076ad3a76ac46eb702)`() const` 

Instructs the server to start or stop training for this brain. Necessary to do before a simulator can connect. Returns true if training was successfully started.

#### `public void `[`stop`](#classbonsai_1_1_brain_1a80f932e60386e75030d416133f81c334)`() const` 

#### `public const std::string & `[`name`](#classbonsai_1_1_brain_1aa9dbe90cfe1e8047c22d71a4203978e4)`() const` 

Name of the brain as specified when it was created.

#### `public const std::string `[`description`](#classbonsai_1_1_brain_1aab7e97119f6d864c0ce874e6365e9924)`() const` 

Returns the user created description for the brain.

#### `public inline int `[`version`](#classbonsai_1_1_brain_1a694824eb2724cf6dfa50ad5031db87ab)`() const` 

Returns version number of the brain

#### `public std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > `[`config`](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504)`()` 

Configuration used to talk to this brain.

# class bonsai::Config

[Config](#classbonsai_1_1_config) class.

Used to manage bonsai configuration environments. [Config](#classbonsai_1_1_config) files can be either specified in the users home directory or in a local directory. In addition, configuration parameters can be parsed from the command line.

Example `~/.bonsai` config file: [DEFAULT]
username = admin
accesskey = None
profile = dev

[dev]
url = http://localhost:5000
username = admin
accesskey = 00000000-1111-2222-3333-000000000001

[alpha]
url = https://alpha-api.int.bons.ai
username = mikest

The `profile` key can be used to switch between different profiles in the same configuration file.

### Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  explicit `[`Config`](#classbonsai_1_1_config_1a47dfbba4858e3a02fff1e45de6025b71)`(const string & profile)` | Constructs a default configurartion. 
`public  `[`Config`](#classbonsai_1_1_config_1ac407ef330cc16af572d79cbabc759d83)`(int argc,char ** argv,const string & profile)` | Constructs a config by looking in the configuration files and parsing the command line arguments. 
`public  `[`Config`](#classbonsai_1_1_config_1af4416c5a7ee00d96aba11319dfa7b7aa)`(const `[`Config`](#classbonsai_1_1_config)` & other)` | 
`public  `[`~Config`](#classbonsai_1_1_config_1a5fcb221d890b81a100281e5b86938674)`()` | 
`public void `[`set_accesskey`](#classbonsai_1_1_config_1a00756eb27057e4edf5a161cb07ee8e37)`(string const & value)` | Server authentication token. Obtained from the bonsai server. you will need to set it in your config.
`public string const  & `[`accesskey`](#classbonsai_1_1_config_1a69bfe3887c27bd49ef4222fc63bf034b)`() const` | 
`public void `[`set_username`](#classbonsai_1_1_config_1adaae10932ff020e521a5f6526493b0cb)`(string const & value)` | Account user name. The account you signed up with.
`public string const  & `[`username`](#classbonsai_1_1_config_1ae9571b1f87f1f152fd967fc3494c8b98)`() const` | 
`public void `[`set_url`](#classbonsai_1_1_config_1a9fde5395082d9293935d791d3abf65ce)`(string const & value)` | Server URL. Address and port number of the bonsai server. Normally you should not need to change this.
`public string const  & `[`url`](#classbonsai_1_1_config_1acdeee5de62b169526c533d4072df913d)`() const` | 
`public void `[`set_brain`](#classbonsai_1_1_config_1a1414271cc3e87e8c2624ba75cee92c7b)`(string const & value)` | BRAIN name. Name of the BRAIN on the server.
`public string const  & `[`brain`](#classbonsai_1_1_config_1ae8bd8f9ab5f78e072f286b45a7917e2f)`() const` | 
`public void `[`set_predict`](#classbonsai_1_1_config_1abf457ec5528ae80c0e96b0cad29ad502)`(bool value)` | [Simulator](#classbonsai_1_1_simulator) mode. The mode simulators will run in, true if running for prediction, false for training.
`public bool `[`predict`](#classbonsai_1_1_config_1a9aef937fcbc64276b012157fabdad614)`() const` | 
`public void `[`set_brain_version`](#classbonsai_1_1_config_1a584be4e9b26de40248a643c9177ec258)`(int value)` | [Brain](#classbonsai_1_1_brain) version. The version of the brain to use when running for prediction. Set to 0 to use latest version
`public int `[`brain_version`](#classbonsai_1_1_config_1a597e37bcf785d81c740a46ed31d23f3f)`() const` | 
`public string const  & `[`recording_file`](#classbonsai_1_1_config_1ae73397364b4a471c7a76d6deffe01334)`() const` | [Simulator](#classbonsai_1_1_simulator) log file path. Path to a file to use for simulator logging. If you are implementing a simulator this may be used to specify a log file in a simulator specific nature. Implementation is left as an exercise to the simulator.
`public void `[`set_recording_file`](#classbonsai_1_1_config_1ab544a9ac4dd9dcf34c8af35e34a00f22)`(string const & value)` | 

### Members

#### `public  explicit `[`Config`](#classbonsai_1_1_config_1a47dfbba4858e3a02fff1e45de6025b71)`(const string & profile)` 

Constructs a default configurartion. 
#### Parameters
* `profile` name of the default profile.

Default configurations are stored in `~/.bonsai` and `./.bonsai` configuration files. The local configuration file will override settings in the users home directory configuration file.

#### `public  `[`Config`](#classbonsai_1_1_config_1ac407ef330cc16af572d79cbabc759d83)`(int argc,char ** argv,const string & profile)` 

Constructs a config by looking in the configuration files and parsing the command line arguments. 
#### Parameters
* `argc` ...as passed to `int main(int argc, char** argv)`. 

* `argv` ...same. 

* `profile` name of the default profile.

Example arguments are:

* `--accesskey=00000000-1111-2222-3333-000000000001`

* `--username=admin`

* `--url=[http://localhost:32802](http://localhost:32802)`

Unrecognized arguments will be ignored.

#### `public  `[`Config`](#classbonsai_1_1_config_1af4416c5a7ee00d96aba11319dfa7b7aa)`(const `[`Config`](#classbonsai_1_1_config)` & other)` 

#### `public  `[`~Config`](#classbonsai_1_1_config_1a5fcb221d890b81a100281e5b86938674)`()` 

#### `public void `[`set_accesskey`](#classbonsai_1_1_config_1a00756eb27057e4edf5a161cb07ee8e37)`(string const & value)` 

Server authentication token. Obtained from the bonsai server. you will need to set it in your config.

#### `public string const  & `[`accesskey`](#classbonsai_1_1_config_1a69bfe3887c27bd49ef4222fc63bf034b)`() const` 

#### `public void `[`set_username`](#classbonsai_1_1_config_1adaae10932ff020e521a5f6526493b0cb)`(string const & value)` 

Account user name. The account you signed up with.

#### `public string const  & `[`username`](#classbonsai_1_1_config_1ae9571b1f87f1f152fd967fc3494c8b98)`() const` 

#### `public void `[`set_url`](#classbonsai_1_1_config_1a9fde5395082d9293935d791d3abf65ce)`(string const & value)` 

Server URL. Address and port number of the bonsai server. Normally you should not need to change this.

#### `public string const  & `[`url`](#classbonsai_1_1_config_1acdeee5de62b169526c533d4072df913d)`() const` 

#### `public void `[`set_brain`](#classbonsai_1_1_config_1a1414271cc3e87e8c2624ba75cee92c7b)`(string const & value)` 

BRAIN name. Name of the BRAIN on the server.

#### `public string const  & `[`brain`](#classbonsai_1_1_config_1ae8bd8f9ab5f78e072f286b45a7917e2f)`() const` 

#### `public void `[`set_predict`](#classbonsai_1_1_config_1abf457ec5528ae80c0e96b0cad29ad502)`(bool value)` 

[Simulator](#classbonsai_1_1_simulator) mode. The mode simulators will run in, true if running for prediction, false for training.

#### `public bool `[`predict`](#classbonsai_1_1_config_1a9aef937fcbc64276b012157fabdad614)`() const` 

#### `public void `[`set_brain_version`](#classbonsai_1_1_config_1a584be4e9b26de40248a643c9177ec258)`(int value)` 

[Brain](#classbonsai_1_1_brain) version. The version of the brain to use when running for prediction. Set to 0 to use latest version

#### `public int `[`brain_version`](#classbonsai_1_1_config_1a597e37bcf785d81c740a46ed31d23f3f)`() const` 

#### `public string const  & `[`recording_file`](#classbonsai_1_1_config_1ae73397364b4a471c7a76d6deffe01334)`() const` 

[Simulator](#classbonsai_1_1_simulator) log file path. Path to a file to use for simulator logging. If you are implementing a simulator this may be used to specify a log file in a simulator specific nature. Implementation is left as an exercise to the simulator.

#### `public void `[`set_recording_file`](#classbonsai_1_1_config_1ab544a9ac4dd9dcf34c8af35e34a00f22)`(string const & value)` 

# class bonsai::InklingMessage

### Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`InklingMessage`](#classbonsai_1_1_inkling_message_1ad43c217b129192875af2c15d8d93da70)`() = default` | 
`public virtual  `[`~InklingMessage`](#classbonsai_1_1_inkling_message_1aa6814642440e8bbf988d1c61d90ecb1d)`() = default` | 
`public string `[`as_json`](#classbonsai_1_1_inkling_message_1a1f49b396e9cf3bb657a1fbdd5a322ecb)`() const` | 
`public  `[`operator bool`](#classbonsai_1_1_inkling_message_1abc969b65e16a3b09919b05a370d3c053)`() const` | 
`public `[`Type`](#classbonsai_1_1_inkling_message_1ac2a91717bd7f9e48b2138318e5c2602c)` `[`get_type`](#classbonsai_1_1_inkling_message_1a7e6c306594fc0a27390b054f76e621c1)`(string const & key) const` | 
`public inline virtual bool `[`has_value`](#classbonsai_1_1_inkling_message_1af909bcd0b23fb7ec32ddb7dc137f38e5)`(string const & key) const` | 
`public void `[`set_float64`](#classbonsai_1_1_inkling_message_1aaea887dc322ed0b6c4de1e7546d8fdba)`(string const & key,double value)` | 
`public double `[`get_float64`](#classbonsai_1_1_inkling_message_1a1bec428471ff3fa220f9dc9a00e8ee7c)`(string const & key) const` | 
`public void `[`set_float32`](#classbonsai_1_1_inkling_message_1af5090a6dde8fb3e48142d00e7a59fa0c)`(string const & key,float value)` | 
`public float `[`get_float32`](#classbonsai_1_1_inkling_message_1a0379386312e0627d3e59a0b6520fa11c)`(string const & key) const` | 
`public void `[`set_int64`](#classbonsai_1_1_inkling_message_1a0eff72b81f5edcc76489766303f9f599)`(string const & key,int64_t value)` | 
`public int64_t `[`get_int64`](#classbonsai_1_1_inkling_message_1acf31d58bc222944d306d3a97d3880f89)`(string const & key) const` | 
`public void `[`set_int32`](#classbonsai_1_1_inkling_message_1a5b71ba262b7d3ba859013e6e91e85800)`(string const & key,int32_t value)` | 
`public int32_t `[`get_int32`](#classbonsai_1_1_inkling_message_1abe0942b13d2b2d6bafec1605c7e392c4)`(string const & key) const` | 
`public void `[`set_int16`](#classbonsai_1_1_inkling_message_1a80b56be0f027c66b680e77cd0bae849b)`(string const & key,int16_t value)` | 
`public int16_t `[`get_int16`](#classbonsai_1_1_inkling_message_1a316809553ec4b68d506d0f7bc829a7a1)`(string const & key) const` | 
`public void `[`set_int8`](#classbonsai_1_1_inkling_message_1aab1e6a535205b9ef2c897b60a1628ec2)`(string const & key,int8_t value)` | 
`public int8_t `[`get_int8`](#classbonsai_1_1_inkling_message_1ab73a4fc3eb4bc31d89dbdbb734dd5283)`(string const & key) const` | 
`public void `[`set_uint64`](#classbonsai_1_1_inkling_message_1a2fb83e910e8a2595c3cc305ca89cacd4)`(string const & key,uint64_t value)` | 
`public uint64_t `[`get_uint64`](#classbonsai_1_1_inkling_message_1a224edbd084837266557902385b549e6c)`(string const & key) const` | 
`public void `[`set_uint32`](#classbonsai_1_1_inkling_message_1a1f101b8a532dd51ac450bf523788e7f9)`(string const & key,uint32_t value)` | 
`public uint32_t `[`get_uint32`](#classbonsai_1_1_inkling_message_1aa6e64faf1a658a987d8f0e83c5e7696b)`(string const & key) const` | 
`public void `[`set_uint16`](#classbonsai_1_1_inkling_message_1a956342dfdae82366aa7090de66590376)`(string const & key,uint16_t value)` | 
`public uint16_t `[`get_uint16`](#classbonsai_1_1_inkling_message_1a7fd84fe0e39f65150bcfe764155c91d1)`(string const & key) const` | 
`public void `[`set_uint8`](#classbonsai_1_1_inkling_message_1a4bf4e9c20fe99dac66e8f931c8f64e61)`(string const & key,uint8_t value)` | 
`public uint8_t `[`get_uint8`](#classbonsai_1_1_inkling_message_1a6550906b02c765de78a9e97f855d26b6)`(string const & key) const` | 

### Members

#### `public  `[`InklingMessage`](#classbonsai_1_1_inkling_message_1ad43c217b129192875af2c15d8d93da70)`() = default` 

#### `public virtual  `[`~InklingMessage`](#classbonsai_1_1_inkling_message_1aa6814642440e8bbf988d1c61d90ecb1d)`() = default` 

#### `public string `[`as_json`](#classbonsai_1_1_inkling_message_1a1f49b396e9cf3bb657a1fbdd5a322ecb)`() const` 

#### `public  `[`operator bool`](#classbonsai_1_1_inkling_message_1abc969b65e16a3b09919b05a370d3c053)`() const` 

#### `public `[`Type`](#classbonsai_1_1_inkling_message_1ac2a91717bd7f9e48b2138318e5c2602c)` `[`get_type`](#classbonsai_1_1_inkling_message_1a7e6c306594fc0a27390b054f76e621c1)`(string const & key) const` 

#### `public inline virtual bool `[`has_value`](#classbonsai_1_1_inkling_message_1af909bcd0b23fb7ec32ddb7dc137f38e5)`(string const & key) const` 

#### `public void `[`set_float64`](#classbonsai_1_1_inkling_message_1aaea887dc322ed0b6c4de1e7546d8fdba)`(string const & key,double value)` 

#### `public double `[`get_float64`](#classbonsai_1_1_inkling_message_1a1bec428471ff3fa220f9dc9a00e8ee7c)`(string const & key) const` 

#### `public void `[`set_float32`](#classbonsai_1_1_inkling_message_1af5090a6dde8fb3e48142d00e7a59fa0c)`(string const & key,float value)` 

#### `public float `[`get_float32`](#classbonsai_1_1_inkling_message_1a0379386312e0627d3e59a0b6520fa11c)`(string const & key) const` 

#### `public void `[`set_int64`](#classbonsai_1_1_inkling_message_1a0eff72b81f5edcc76489766303f9f599)`(string const & key,int64_t value)` 

#### `public int64_t `[`get_int64`](#classbonsai_1_1_inkling_message_1acf31d58bc222944d306d3a97d3880f89)`(string const & key) const` 

#### `public void `[`set_int32`](#classbonsai_1_1_inkling_message_1a5b71ba262b7d3ba859013e6e91e85800)`(string const & key,int32_t value)` 

#### `public int32_t `[`get_int32`](#classbonsai_1_1_inkling_message_1abe0942b13d2b2d6bafec1605c7e392c4)`(string const & key) const` 

#### `public void `[`set_int16`](#classbonsai_1_1_inkling_message_1a80b56be0f027c66b680e77cd0bae849b)`(string const & key,int16_t value)` 

#### `public int16_t `[`get_int16`](#classbonsai_1_1_inkling_message_1a316809553ec4b68d506d0f7bc829a7a1)`(string const & key) const` 

#### `public void `[`set_int8`](#classbonsai_1_1_inkling_message_1aab1e6a535205b9ef2c897b60a1628ec2)`(string const & key,int8_t value)` 

#### `public int8_t `[`get_int8`](#classbonsai_1_1_inkling_message_1ab73a4fc3eb4bc31d89dbdbb734dd5283)`(string const & key) const` 

#### `public void `[`set_uint64`](#classbonsai_1_1_inkling_message_1a2fb83e910e8a2595c3cc305ca89cacd4)`(string const & key,uint64_t value)` 

#### `public uint64_t `[`get_uint64`](#classbonsai_1_1_inkling_message_1a224edbd084837266557902385b549e6c)`(string const & key) const` 

#### `public void `[`set_uint32`](#classbonsai_1_1_inkling_message_1a1f101b8a532dd51ac450bf523788e7f9)`(string const & key,uint32_t value)` 

#### `public uint32_t `[`get_uint32`](#classbonsai_1_1_inkling_message_1aa6e64faf1a658a987d8f0e83c5e7696b)`(string const & key) const` 

#### `public void `[`set_uint16`](#classbonsai_1_1_inkling_message_1a956342dfdae82366aa7090de66590376)`(string const & key,uint16_t value)` 

#### `public uint16_t `[`get_uint16`](#classbonsai_1_1_inkling_message_1a7fd84fe0e39f65150bcfe764155c91d1)`(string const & key) const` 

#### `public void `[`set_uint8`](#classbonsai_1_1_inkling_message_1a4bf4e9c20fe99dac66e8f931c8f64e61)`(string const & key,uint8_t value)` 

#### `public uint8_t `[`get_uint8`](#classbonsai_1_1_inkling_message_1a6550906b02c765de78a9e97f855d26b6)`(string const & key) const` 

# class bonsai::Simulator

[Simulator](#classbonsai_1_1_simulator) class.

An abstract base class for creating simple simulations to run against a brain. The developer must implement the simulate method.

### Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`Simulator`](#classbonsai_1_1_simulator_1acbb6d3fa870ea90796d3151d3f7f672e)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,string name)` | 
`public  `[`Simulator`](#classbonsai_1_1_simulator_1ac198e830563bc7a84538346957af4140)`(const `[`Simulator`](#classbonsai_1_1_simulator)` & rh)` | 
`public virtual  `[`~Simulator`](#classbonsai_1_1_simulator_1a3fbc77a81d8a949b9f68009fde5236eb)`()` | 
`public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a2f667dac361f1d0f7212fa9d6226e954)`()` | Returns the brain being used for this simulation
`public const shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a6174bb666955b4b4ac66ec69a597161b)`() const` | 
`public const string & `[`name`](#classbonsai_1_1_simulator_1a5f8a300cf271f36a8208a73c76c46a16)`() const` | Returns the simulator name that was passed in when contructed
`public bool `[`predict`](#classbonsai_1_1_simulator_1a12b841f50b017394d2531647cade6a7c)`() const` | Returns weather or not the simulation is setup to run in predict or training mode
`public bool `[`run`](#classbonsai_1_1_simulator_1ac10c05bc1a32fdb44b7f10e352983d62)`()` | Main loop call for driving the simulation. Will return false when the simulation has finished or halted.
`public const string & `[`objective_name`](#classbonsai_1_1_simulator_1aa02554fd48cdd84897f1f304c1889bd3)`() const` | Accessor method which returns the name of the current objective. Objective may be updated before episode_start is called. When running for prediction and during start up, objective will return an empty string.
`public void `[`episode_start`](#classbonsai_1_1_simulator_1ab6bd5012aeba3fc44ad2abf9ab6bd517)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & parameters,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & initial_state)` | Subclassers should implement this method to handle the start of a simulation session.
`public void `[`simulate`](#classbonsai_1_1_simulator_1afcc8abc450dabf64ced8c4adf282f94b)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & action,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & state,float & reward,bool & terminal)` | Subclassers should implement this method to advance a single step in a simulation.
`public inline virtual bool `[`standby`](#classbonsai_1_1_simulator_1a07782c9bdab2303899ca8c6aa42335fc)`(const string & reason)` | Subclassers can implement this method to take action when the server is busy.

### Members

#### `public  `[`Simulator`](#classbonsai_1_1_simulator_1acbb6d3fa870ea90796d3151d3f7f672e)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,string name)` 

#### `public  `[`Simulator`](#classbonsai_1_1_simulator_1ac198e830563bc7a84538346957af4140)`(const `[`Simulator`](#classbonsai_1_1_simulator)` & rh)` 

#### `public virtual  `[`~Simulator`](#classbonsai_1_1_simulator_1a3fbc77a81d8a949b9f68009fde5236eb)`()` 

#### `public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a2f667dac361f1d0f7212fa9d6226e954)`()` 

Returns the brain being used for this simulation

#### `public const shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a6174bb666955b4b4ac66ec69a597161b)`() const` 

#### `public const string & `[`name`](#classbonsai_1_1_simulator_1a5f8a300cf271f36a8208a73c76c46a16)`() const` 

Returns the simulator name that was passed in when contructed

#### `public bool `[`predict`](#classbonsai_1_1_simulator_1a12b841f50b017394d2531647cade6a7c)`() const` 

Returns weather or not the simulation is setup to run in predict or training mode

#### `public bool `[`run`](#classbonsai_1_1_simulator_1ac10c05bc1a32fdb44b7f10e352983d62)`()` 

Main loop call for driving the simulation. Will return false when the simulation has finished or halted.

The client should call this method in a loop until it returns false. To run for prediction `[brain()](#classbonsai_1_1_simulator_1a2f667dac361f1d0f7212fa9d6226e954)->config()->[predict()](#classbonsai_1_1_simulator_1a12b841f50b017394d2531647cade6a7c)` must return true.

```cpp
while( mysim.run() ){
    // no-op
}
```

[run()](#classbonsai_1_1_simulator_1ac10c05bc1a32fdb44b7f10e352983d62) will check the state of the server connection and call the appropriate virtual method below.

#### `public const string & `[`objective_name`](#classbonsai_1_1_simulator_1aa02554fd48cdd84897f1f304c1889bd3)`() const` 

Accessor method which returns the name of the current objective. Objective may be updated before episode_start is called. When running for prediction and during start up, objective will return an empty string.

#### `public void `[`episode_start`](#classbonsai_1_1_simulator_1ab6bd5012aeba3fc44ad2abf9ab6bd517)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & parameters,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & initial_state)` 

Subclassers should implement this method to handle the start of a simulation session.

parameters will be populated if a training session is running.

#### Parameters
* `parameters` [InklingMessage](#classbonsai_1_1_inkling_message) of initialization parameters for an episode as defined in inkling. 

* `initial_state` Output [InklingMessage](#classbonsai_1_1_inkling_message). The subclasser should populate this message with the initial state of the simulation.

#### `public void `[`simulate`](#classbonsai_1_1_simulator_1afcc8abc450dabf64ced8c4adf282f94b)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & action,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & state,float & reward,bool & terminal)` 

Subclassers should implement this method to advance a single step in a simulation.

#### Parameters
* `action` Input [InklingMessage](#classbonsai_1_1_inkling_message) of action to be taken as defined in inkling. 

* `state` Output [InklingMessage](#classbonsai_1_1_inkling_message). Should be populated with the current simulator state. 

* `reward` Output reward value as calculated based upon the objective. 

* `terminal` Output terminal state. Set to true if the simulator is in a terminal state.

#### `public inline virtual bool `[`standby`](#classbonsai_1_1_simulator_1a07782c9bdab2303899ca8c6aa42335fc)`(const string & reason)` 

Subclassers can implement this method to take action when the server is busy.

The default action is to wait one second and continue. If returns `true`, the server status will be checked again and the loop will continue.

Generated by [Moxygen](https://sourcey.com/moxygen)