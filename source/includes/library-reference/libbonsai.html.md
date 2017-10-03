# libbonsai Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`namespace `[`bonsai`](#namespacebonsai) | 
`namespace `[`bonsai::internal`](#namespacebonsai_1_1internal) | 
`struct `[`bonsai::internal::simulator_ws_impl::simstep_t`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t) | 

# namespace `bonsai` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public std::ostream & `[`operator<<`](#namespacebonsai_1a71168ea8a53de0fde5b5cc451b3329d2)`(std::ostream & out,const `[`Brain`](#classbonsai_1_1_brain)` & brain)`            | 
`public std::ostream & `[`operator<<`](#namespacebonsai_1a624924e1d14119946c9fef7d3b7c423f)`(std::ostream & out,`[`Config`](#classbonsai_1_1_config)` const & config)`            | 
`public ostream & `[`operator<<`](#namespacebonsai_1a0d80e2483384e36e58a00fa2b91f0f74)`(ostream & out,`[`Simulator`](#classbonsai_1_1_simulator)` const & config)`            | 
`class `[`bonsai::Brain`](#classbonsai_1_1_brain) | [Brain](#classbonsai_1_1_brain) class
`class `[`bonsai::Config`](#classbonsai_1_1_config) | [Config](#classbonsai_1_1_config) class.
`class `[`bonsai::InklingMessage`](#classbonsai_1_1_inkling_message) | 
`class `[`bonsai::Simulator`](#classbonsai_1_1_simulator) | [Simulator](#classbonsai_1_1_simulator) class.

## Members

#### `public std::ostream & `[`operator<<`](#namespacebonsai_1a71168ea8a53de0fde5b5cc451b3329d2)`(std::ostream & out,const `[`Brain`](#classbonsai_1_1_brain)` & brain)` 

#### `public std::ostream & `[`operator<<`](#namespacebonsai_1a624924e1d14119946c9fef7d3b7c423f)`(std::ostream & out,`[`Config`](#classbonsai_1_1_config)` const & config)` 

#### `public ostream & `[`operator<<`](#namespacebonsai_1a0d80e2483384e36e58a00fa2b91f0f74)`(ostream & out,`[`Simulator`](#classbonsai_1_1_simulator)` const & config)` 

# class `bonsai::Brain` 

[Brain](#classbonsai_1_1_brain) class

Used to manage a brain instance and talk with the server backend. Contains state information about the brain and can be used to upload/download inkling to and from the brain on the server.

Requires a shared pointer to a `[bonsai::Config](#classbonsai_1_1_config)` and a brain name.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`Brain`](#classbonsai_1_1_brain_1a1f3b3f8a6ce3f0cc32b568a9d543181c)`(std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > config,std::string name)` | Construct a brain using an existing configuration and brain name.
`public  `[`Brain`](#classbonsai_1_1_brain_1aca5b0271f74f9361fa7fbfc971468cb7)`(const `[`Brain`](#classbonsai_1_1_brain)` & other)` | 
`public  `[`~Brain`](#classbonsai_1_1_brain_1a29e923160047e554d051467a0f09150e)`()` | 
`public void `[`update`](#classbonsai_1_1_brain_1a9ab925945caeb2e837cb035fab3e0417)`()` | Retrieves current state information about the brain from the server
`public bool `[`ready`](#classbonsai_1_1_brain_1a431784d251099fbf02290126cfe11cfd)`() const` | Upload a project and associated files to the server for this brain
`public void `[`start`](#classbonsai_1_1_brain_1aab155b06ee17e7076ad3a76ac46eb702)`() const` | Instructs the server to start or stop training for this brain. Necessary to do before a simulator can connect. Returns true if training was successfully started.
`public void `[`stop`](#classbonsai_1_1_brain_1a80f932e60386e75030d416133f81c334)`() const` | 
`public const std::string & `[`name`](#classbonsai_1_1_brain_1aa9dbe90cfe1e8047c22d71a4203978e4)`() const` | Name of the brain as specified when it was created.
`public const std::string `[`description`](#classbonsai_1_1_brain_1aab7e97119f6d864c0ce874e6365e9924)`() const` | Returns the user created description for the brain.
`public std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > `[`config`](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504)`()` | Configuration used to talk to this brain.

## Members

#### `public  `[`Brain`](#classbonsai_1_1_brain_1a1f3b3f8a6ce3f0cc32b568a9d543181c)`(std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > config,std::string name)` 

Construct a brain using an existing configuration and brain name.

#### Parameters
* `config` shared pointer to previously created [bonsai::Config](#classbonsai_1_1_config). 

* `name` brain name as specified on the server. Name can not be empty.

#### `public  `[`Brain`](#classbonsai_1_1_brain_1aca5b0271f74f9361fa7fbfc971468cb7)`(const `[`Brain`](#classbonsai_1_1_brain)` & other)` 

#### `public  `[`~Brain`](#classbonsai_1_1_brain_1a29e923160047e554d051467a0f09150e)`()` 

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

#### `public std::shared_ptr< `[`Config`](#classbonsai_1_1_config)` > `[`config`](#classbonsai_1_1_brain_1a2b7f28b188257207b9089a9bcdab2504)`()` 

Configuration used to talk to this brain.

# class `bonsai::Config` 

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

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  explicit `[`Config`](#classbonsai_1_1_config_1a508ef56f502db411c6c4c416aa988960)`(const std::string & profile)` | Constructs a default configurartion. 
`public  `[`Config`](#classbonsai_1_1_config_1a2008123180eb79f08cb64c33d476ae8b)`(int argc,char ** argv,const std::string & profile)` | Constructs a config by looking in the configuration files and parsing the command line arguments. 
`public  `[`Config`](#classbonsai_1_1_config_1af4416c5a7ee00d96aba11319dfa7b7aa)`(const `[`Config`](#classbonsai_1_1_config)` & other)` | 
`public  `[`~Config`](#classbonsai_1_1_config_1a5fcb221d890b81a100281e5b86938674)`()` | 
`public void `[`set_accesskey`](#classbonsai_1_1_config_1a31e9803922f70b3c19ae57c85f165b78)`(std::string const & value)` | Server authentication token. Obtained from the bonsai server. you will need to set it in your config.
`public std::string const  & `[`accesskey`](#classbonsai_1_1_config_1a40759da590ac2ebf00c0c0b66f342d55)`() const` | 
`public void `[`set_username`](#classbonsai_1_1_config_1a7cbab8f4d46d403ff0914e9a57fe1a90)`(std::string const & value)` | Account user name. The account you signed up with.
`public std::string const  & `[`username`](#classbonsai_1_1_config_1adcfa99f02e7c59d2e57e69c429b78d51)`() const` | 
`public void `[`set_url`](#classbonsai_1_1_config_1a74f8a42329b4e0fc863791dd7f7e6a63)`(std::string const & value)` | Server URL. Address and port number of the bonsai server. Normally you should not need to change this.
`public std::string const  & `[`url`](#classbonsai_1_1_config_1a439188add57def2c2068f5bea3363dc0)`() const` | 

## Members

#### `public  explicit `[`Config`](#classbonsai_1_1_config_1a508ef56f502db411c6c4c416aa988960)`(const std::string & profile)` 

Constructs a default configurartion. 
#### Parameters
* `profile` name of the default profile.

Default configurations are stored in `~/.bonsai` and `./.bonsai` configuration files. The local configuration file will override settings in the users home directory configuration file.

#### `public  `[`Config`](#classbonsai_1_1_config_1a2008123180eb79f08cb64c33d476ae8b)`(int argc,char ** argv,const std::string & profile)` 

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

#### `public void `[`set_accesskey`](#classbonsai_1_1_config_1a31e9803922f70b3c19ae57c85f165b78)`(std::string const & value)` 

Server authentication token. Obtained from the bonsai server. you will need to set it in your config.

#### `public std::string const  & `[`accesskey`](#classbonsai_1_1_config_1a40759da590ac2ebf00c0c0b66f342d55)`() const` 

#### `public void `[`set_username`](#classbonsai_1_1_config_1a7cbab8f4d46d403ff0914e9a57fe1a90)`(std::string const & value)` 

Account user name. The account you signed up with.

#### `public std::string const  & `[`username`](#classbonsai_1_1_config_1adcfa99f02e7c59d2e57e69c429b78d51)`() const` 

#### `public void `[`set_url`](#classbonsai_1_1_config_1a74f8a42329b4e0fc863791dd7f7e6a63)`(std::string const & value)` 

Server URL. Address and port number of the bonsai server. Normally you should not need to change this.

#### `public std::string const  & `[`url`](#classbonsai_1_1_config_1a439188add57def2c2068f5bea3363dc0)`() const` 

# class `bonsai::InklingMessage` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`InklingMessage`](#classbonsai_1_1_inkling_message_1ad43c217b129192875af2c15d8d93da70)`() = default` | 
`public virtual  `[`~InklingMessage`](#classbonsai_1_1_inkling_message_1aa6814642440e8bbf988d1c61d90ecb1d)`() = default` | 
`public string `[`as_json`](#classbonsai_1_1_inkling_message_1a1f49b396e9cf3bb657a1fbdd5a322ecb)`() const` | 
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

## Members

#### `public  `[`InklingMessage`](#classbonsai_1_1_inkling_message_1ad43c217b129192875af2c15d8d93da70)`() = default` 

#### `public virtual  `[`~InklingMessage`](#classbonsai_1_1_inkling_message_1aa6814642440e8bbf988d1c61d90ecb1d)`() = default` 

#### `public string `[`as_json`](#classbonsai_1_1_inkling_message_1a1f49b396e9cf3bb657a1fbdd5a322ecb)`() const` 

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

# class `bonsai::Simulator` 

[Simulator](#classbonsai_1_1_simulator) class.

An abstract base class for creating simple simulations to run against a brain. The developer must implement the simulate method.

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`Simulator`](#classbonsai_1_1_simulator_1acbb6d3fa870ea90796d3151d3f7f672e)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,string name)` | 
`public  `[`Simulator`](#classbonsai_1_1_simulator_1ac198e830563bc7a84538346957af4140)`(const `[`Simulator`](#classbonsai_1_1_simulator)` & rh)` | 
`public virtual  `[`~Simulator`](#classbonsai_1_1_simulator_1a3fbc77a81d8a949b9f68009fde5236eb)`()` | 
`public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a2f667dac361f1d0f7212fa9d6226e954)`()` | Returns the brain being used for this simulation
`public const shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a6174bb666955b4b4ac66ec69a597161b)`() const` | 
`public const string & `[`name`](#classbonsai_1_1_simulator_1a5f8a300cf271f36a8208a73c76c46a16)`() const` | Returns the simulator name that was passed in when contructed
`public bool `[`train`](#classbonsai_1_1_simulator_1a8d57a0a2b057603fbad99700e2502c97)`()` | Main loop call for driving the simulation. Will return false when the simulation has finished or halted.
`public bool `[`predict`](#classbonsai_1_1_simulator_1a8dbcc3eff9826349cd909428e8a6f5b3)`()` | Main loop for driving for prediction. Works the same as `[train()](#classbonsai_1_1_simulator_1a8d57a0a2b057603fbad99700e2502c97)`
`public void `[`episode_start`](#classbonsai_1_1_simulator_1ab6bd5012aeba3fc44ad2abf9ab6bd517)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & parameters,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & initial_state)` | Subclassers should implement this method to handle the start of a simulation session.
`public void `[`simulate`](#classbonsai_1_1_simulator_1adafde5ab815e2b6e902521b0034601eb)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & action,const string & objective,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & state,float & reward,bool & terminal)` | Subclassers should implement this method to advance a single step in a simulation.
`public inline virtual bool `[`standby`](#classbonsai_1_1_simulator_1a07782c9bdab2303899ca8c6aa42335fc)`(const string & reason)` | Subclassers can implement this method to take action when the server is busy.

## Members

#### `public  `[`Simulator`](#classbonsai_1_1_simulator_1acbb6d3fa870ea90796d3151d3f7f672e)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,string name)` 

#### `public  `[`Simulator`](#classbonsai_1_1_simulator_1ac198e830563bc7a84538346957af4140)`(const `[`Simulator`](#classbonsai_1_1_simulator)` & rh)` 

#### `public virtual  `[`~Simulator`](#classbonsai_1_1_simulator_1a3fbc77a81d8a949b9f68009fde5236eb)`()` 

#### `public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a2f667dac361f1d0f7212fa9d6226e954)`()` 

Returns the brain being used for this simulation

#### `public const shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1_simulator_1a6174bb666955b4b4ac66ec69a597161b)`() const` 

#### `public const string & `[`name`](#classbonsai_1_1_simulator_1a5f8a300cf271f36a8208a73c76c46a16)`() const` 

Returns the simulator name that was passed in when contructed

#### `public bool `[`train`](#classbonsai_1_1_simulator_1a8d57a0a2b057603fbad99700e2502c97)`()` 

Main loop call for driving the simulation. Will return false when the simulation has finished or halted.

The client should call this method in a loop until it returns false.

```cpp
while( mysim.train() ){
    // no-op
}
```

Train will check the state of the server connection and call the appropriate virtual method below.

#### `public bool `[`predict`](#classbonsai_1_1_simulator_1a8dbcc3eff9826349cd909428e8a6f5b3)`()` 

Main loop for driving for prediction. Works the same as `[train()](#classbonsai_1_1_simulator_1a8d57a0a2b057603fbad99700e2502c97)`

#### `public void `[`episode_start`](#classbonsai_1_1_simulator_1ab6bd5012aeba3fc44ad2abf9ab6bd517)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & parameters,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & initial_state)` 

Subclassers should implement this method to handle the start of a simulation session.

parameters will be populated if a training session is running.

#### Parameters
* `parameters` [InklingMessage](#classbonsai_1_1_inkling_message) of initialization parameters for an episode as defined in inkling. 

* `initial_state` Output [InklingMessage](#classbonsai_1_1_inkling_message). The subclasser should populate this message with the initial state of the simulation.

#### `public void `[`simulate`](#classbonsai_1_1_simulator_1adafde5ab815e2b6e902521b0034601eb)`(const `[`InklingMessage`](#classbonsai_1_1_inkling_message)` & action,const string & objective,`[`InklingMessage`](#classbonsai_1_1_inkling_message)` & state,float & reward,bool & terminal)` 

Subclassers should implement this method to advance a single step in a simulation.

#### Parameters
* `action` Input [InklingMessage](#classbonsai_1_1_inkling_message) of action to be taken as defined in inkling. 

* `objective` If training, the name of the objective to be used for calculating the reward. 

* `state` Output [InklingMessage](#classbonsai_1_1_inkling_message). Should be populated with the current simulator state. 

* `reward` Output reward value as calculated based upon the objective. 

* `terminal` Output terminal state. Set to true if the simulator is in a terminal state.

#### `public inline virtual bool `[`standby`](#classbonsai_1_1_simulator_1a07782c9bdab2303899ca8c6aa42335fc)`(const string & reason)` 

Subclassers can implement this method to take action when the server is busy.

The default action is to wait one second and continue. If returns `true`, the server status will be checked again and the loop will continue.

# namespace `bonsai::internal` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public void `[`default_response`](#namespacebonsai_1_1internal_1ad46f0fcdf56c42f90cd341e9c48acbcf)`(const web::json::value & j)`            | 
`public void `[`send_request`](#namespacebonsai_1_1internal_1a6545d360fd609fcb79d66809a6391519)`(const std::string & uri,const web::http::http_request & request,`[`response_func`](#namespacebonsai_1_1internal_1a5bc6a3e06b60a24c4ac0d605b0e317fa)` success,`[`response_func`](#namespacebonsai_1_1internal_1a5bc6a3e06b60a24c4ac0d605b0e317fa)` failure) = default`            | 
`public std::string `[`string_for_key`](#namespacebonsai_1_1internal_1af2026b24cb66fb02fda6f43eba16f9f9)`(const web::json::value & value,const std::string & key,const std::string & _default)`            | 
`public bool `[`bool_for_key`](#namespacebonsai_1_1internal_1a7b0755c471fe7812fd70d932b87ddff7)`(const web::json::value & value,const std::string & key,bool _default)`            | 
`public int `[`int_for_key`](#namespacebonsai_1_1internal_1af97c2c9d923ac51c4b75a985a806f310)`(const web::json::value & value,const std::string & key,int _default)`            | 
`public double `[`double_for_key`](#namespacebonsai_1_1internal_1abc3ff0f8680c1bdbb09998fcf96ce6c9)`(const web::json::value & value,const std::string & key,double _default)`            | 
`class `[`bonsai::internal::inkling_message_pb`](#classbonsai_1_1internal_1_1inkling__message__pb) | 
`class `[`bonsai::internal::InklingMessageFactory`](#classbonsai_1_1internal_1_1_inkling_message_factory) | 
`class `[`bonsai::internal::simulator_ws_impl`](#classbonsai_1_1internal_1_1simulator__ws__impl) | 
`struct `[`bonsai::internal::simulator_http_impl`](#structbonsai_1_1internal_1_1simulator__http__impl) | 

## Members

#### `public void `[`default_response`](#namespacebonsai_1_1internal_1ad46f0fcdf56c42f90cd341e9c48acbcf)`(const web::json::value & j)` 

#### `public void `[`send_request`](#namespacebonsai_1_1internal_1a6545d360fd609fcb79d66809a6391519)`(const std::string & uri,const web::http::http_request & request,`[`response_func`](#namespacebonsai_1_1internal_1a5bc6a3e06b60a24c4ac0d605b0e317fa)` success,`[`response_func`](#namespacebonsai_1_1internal_1a5bc6a3e06b60a24c4ac0d605b0e317fa)` failure) = default` 

#### `public std::string `[`string_for_key`](#namespacebonsai_1_1internal_1af2026b24cb66fb02fda6f43eba16f9f9)`(const web::json::value & value,const std::string & key,const std::string & _default)` 

#### `public bool `[`bool_for_key`](#namespacebonsai_1_1internal_1a7b0755c471fe7812fd70d932b87ddff7)`(const web::json::value & value,const std::string & key,bool _default)` 

#### `public int `[`int_for_key`](#namespacebonsai_1_1internal_1af97c2c9d923ac51c4b75a985a806f310)`(const web::json::value & value,const std::string & key,int _default)` 

#### `public double `[`double_for_key`](#namespacebonsai_1_1internal_1abc3ff0f8680c1bdbb09998fcf96ce6c9)`(const web::json::value & value,const std::string & key,double _default)` 

# class `bonsai::internal::inkling_message_pb` 

```
class bonsai::internal::inkling_message_pb
  : public bonsai::InklingMessage
```  

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public inline  explicit `[`inkling_message_pb`](#classbonsai_1_1internal_1_1inkling__message__pb_1acff68371433e6875a28c2ffefa57d3d7)`(shared_ptr< Message > message)` | 
`public virtual  `[`~inkling_message_pb`](#classbonsai_1_1internal_1_1inkling__message__pb_1a3353236ae3335ab3fc0fd16fb6db976c)`() = default` | 
`public inline virtual string `[`as_json`](#classbonsai_1_1internal_1_1inkling__message__pb_1af882cfe9e60f7887bc852523a6426a28)`() const` | 
`public inline virtual `[`Type`](#classbonsai_1_1_inkling_message_1ac2a91717bd7f9e48b2138318e5c2602c)` `[`get_type`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab6501cb59e1dd0dc451ddb8f7b94170d)`(string const & key) const` | 
`public inline virtual void `[`set_float64`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab2786bce4f49df917097a8e54b847464)`(string const & key,double value)` | 
`public inline virtual double `[`get_float64`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab4bfedcb6a457f7c9a11db6eb493514e)`(string const & key) const` | 
`public inline virtual void `[`set_float32`](#classbonsai_1_1internal_1_1inkling__message__pb_1acd103090ae9d7bde4e55319c78e43a48)`(string const & key,float value)` | 
`public inline virtual float `[`get_float32`](#classbonsai_1_1internal_1_1inkling__message__pb_1ae26eb7f91b0f4c24e5aea7b3c57e8f1a)`(string const & key) const` | 
`public inline virtual void `[`set_int64`](#classbonsai_1_1internal_1_1inkling__message__pb_1af71a8d2f7c0f4c60b016e6c58cb6e607)`(string const & key,int64_t value)` | 
`public inline virtual int64_t `[`get_int64`](#classbonsai_1_1internal_1_1inkling__message__pb_1a2805585bf91aa3ba7c62e9135f9bab14)`(string const & key) const` | 
`public inline virtual void `[`set_int32`](#classbonsai_1_1internal_1_1inkling__message__pb_1afd74a525e5e1204cf9d698fd0395c7b5)`(string const & key,int32_t value)` | 
`public inline virtual int32_t `[`get_int32`](#classbonsai_1_1internal_1_1inkling__message__pb_1aab1f8036c1ff76ef26d85771cf42d818)`(string const & key) const` | 
`public inline virtual void `[`set_int16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a2a042b2fa60f594738f7367c29392521)`(string const & key,int16_t value)` | 
`public inline virtual int16_t `[`get_int16`](#classbonsai_1_1internal_1_1inkling__message__pb_1aac6b9d5c380eb30a0d8a2932a0e2cba1)`(string const & key) const` | 
`public inline virtual void `[`set_int8`](#classbonsai_1_1internal_1_1inkling__message__pb_1aaa6cbf75b436620c8382c4dbec9e90ae)`(string const & key,int8_t value)` | 
`public inline virtual int8_t `[`get_int8`](#classbonsai_1_1internal_1_1inkling__message__pb_1a4702e837a95e234ae6eb8e33271fffd9)`(string const & key) const` | 
`public inline virtual void `[`set_uint64`](#classbonsai_1_1internal_1_1inkling__message__pb_1aca0feab2084aba43466eb05f964ba3ca)`(string const & key,uint64_t value)` | 
`public inline virtual uint64_t `[`get_uint64`](#classbonsai_1_1internal_1_1inkling__message__pb_1a1d949a4954cccf6c6081aa43fbdd4e13)`(string const & key) const` | 
`public inline virtual void `[`set_uint32`](#classbonsai_1_1internal_1_1inkling__message__pb_1a73a7b9d7fe4d11a734ab2e2234151836)`(string const & key,uint32_t value)` | 
`public inline virtual uint32_t `[`get_uint32`](#classbonsai_1_1internal_1_1inkling__message__pb_1a09df7039154def8cd5353d445787e8c9)`(string const & key) const` | 
`public inline virtual void `[`set_uint16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a33dca7d2295834a652fbee1eef360268)`(string const & key,uint16_t value)` | 
`public inline virtual uint16_t `[`get_uint16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a45e55ed918400129dd6742834382ec02)`(string const & key) const` | 
`public inline virtual void `[`set_uint8`](#classbonsai_1_1internal_1_1inkling__message__pb_1ad0ef59f563256648a8eb31c848392c1d)`(string const & key,uint8_t value)` | 
`public inline virtual uint8_t `[`get_uint8`](#classbonsai_1_1internal_1_1inkling__message__pb_1a00376a3b9693decf8cc321e7eb80caf9)`(string const & key) const` | 
`public inline const shared_ptr< Message > & `[`message`](#classbonsai_1_1internal_1_1inkling__message__pb_1ad37e4719c9ea20aaa38f736b862b0e89)`() const` | 
`public inline shared_ptr< Message > `[`message`](#classbonsai_1_1internal_1_1inkling__message__pb_1aa7e743a07abff6c78614627b97980d1f)`()` | 

## Members

#### `public inline  explicit `[`inkling_message_pb`](#classbonsai_1_1internal_1_1inkling__message__pb_1acff68371433e6875a28c2ffefa57d3d7)`(shared_ptr< Message > message)` 

#### `public virtual  `[`~inkling_message_pb`](#classbonsai_1_1internal_1_1inkling__message__pb_1a3353236ae3335ab3fc0fd16fb6db976c)`() = default` 

#### `public inline virtual string `[`as_json`](#classbonsai_1_1internal_1_1inkling__message__pb_1af882cfe9e60f7887bc852523a6426a28)`() const` 

#### `public inline virtual `[`Type`](#classbonsai_1_1_inkling_message_1ac2a91717bd7f9e48b2138318e5c2602c)` `[`get_type`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab6501cb59e1dd0dc451ddb8f7b94170d)`(string const & key) const` 

#### `public inline virtual void `[`set_float64`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab2786bce4f49df917097a8e54b847464)`(string const & key,double value)` 

#### `public inline virtual double `[`get_float64`](#classbonsai_1_1internal_1_1inkling__message__pb_1ab4bfedcb6a457f7c9a11db6eb493514e)`(string const & key) const` 

#### `public inline virtual void `[`set_float32`](#classbonsai_1_1internal_1_1inkling__message__pb_1acd103090ae9d7bde4e55319c78e43a48)`(string const & key,float value)` 

#### `public inline virtual float `[`get_float32`](#classbonsai_1_1internal_1_1inkling__message__pb_1ae26eb7f91b0f4c24e5aea7b3c57e8f1a)`(string const & key) const` 

#### `public inline virtual void `[`set_int64`](#classbonsai_1_1internal_1_1inkling__message__pb_1af71a8d2f7c0f4c60b016e6c58cb6e607)`(string const & key,int64_t value)` 

#### `public inline virtual int64_t `[`get_int64`](#classbonsai_1_1internal_1_1inkling__message__pb_1a2805585bf91aa3ba7c62e9135f9bab14)`(string const & key) const` 

#### `public inline virtual void `[`set_int32`](#classbonsai_1_1internal_1_1inkling__message__pb_1afd74a525e5e1204cf9d698fd0395c7b5)`(string const & key,int32_t value)` 

#### `public inline virtual int32_t `[`get_int32`](#classbonsai_1_1internal_1_1inkling__message__pb_1aab1f8036c1ff76ef26d85771cf42d818)`(string const & key) const` 

#### `public inline virtual void `[`set_int16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a2a042b2fa60f594738f7367c29392521)`(string const & key,int16_t value)` 

#### `public inline virtual int16_t `[`get_int16`](#classbonsai_1_1internal_1_1inkling__message__pb_1aac6b9d5c380eb30a0d8a2932a0e2cba1)`(string const & key) const` 

#### `public inline virtual void `[`set_int8`](#classbonsai_1_1internal_1_1inkling__message__pb_1aaa6cbf75b436620c8382c4dbec9e90ae)`(string const & key,int8_t value)` 

#### `public inline virtual int8_t `[`get_int8`](#classbonsai_1_1internal_1_1inkling__message__pb_1a4702e837a95e234ae6eb8e33271fffd9)`(string const & key) const` 

#### `public inline virtual void `[`set_uint64`](#classbonsai_1_1internal_1_1inkling__message__pb_1aca0feab2084aba43466eb05f964ba3ca)`(string const & key,uint64_t value)` 

#### `public inline virtual uint64_t `[`get_uint64`](#classbonsai_1_1internal_1_1inkling__message__pb_1a1d949a4954cccf6c6081aa43fbdd4e13)`(string const & key) const` 

#### `public inline virtual void `[`set_uint32`](#classbonsai_1_1internal_1_1inkling__message__pb_1a73a7b9d7fe4d11a734ab2e2234151836)`(string const & key,uint32_t value)` 

#### `public inline virtual uint32_t `[`get_uint32`](#classbonsai_1_1internal_1_1inkling__message__pb_1a09df7039154def8cd5353d445787e8c9)`(string const & key) const` 

#### `public inline virtual void `[`set_uint16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a33dca7d2295834a652fbee1eef360268)`(string const & key,uint16_t value)` 

#### `public inline virtual uint16_t `[`get_uint16`](#classbonsai_1_1internal_1_1inkling__message__pb_1a45e55ed918400129dd6742834382ec02)`(string const & key) const` 

#### `public inline virtual void `[`set_uint8`](#classbonsai_1_1internal_1_1inkling__message__pb_1ad0ef59f563256648a8eb31c848392c1d)`(string const & key,uint8_t value)` 

#### `public inline virtual uint8_t `[`get_uint8`](#classbonsai_1_1internal_1_1inkling__message__pb_1a00376a3b9693decf8cc321e7eb80caf9)`(string const & key) const` 

#### `public inline const shared_ptr< Message > & `[`message`](#classbonsai_1_1internal_1_1inkling__message__pb_1ad37e4719c9ea20aaa38f736b862b0e89)`() const` 

#### `public inline shared_ptr< Message > `[`message`](#classbonsai_1_1internal_1_1inkling__message__pb_1aa7e743a07abff6c78614627b97980d1f)`()` 

# class `bonsai::internal::InklingMessageFactory` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`InklingMessageFactory`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a9fae8cdecc735af896f8b5c53864ee7f)`()` | 
`public  `[`~InklingMessageFactory`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a98b6d5f44706c87b8d74fd45fa60a714)`() = default` | 
`public unique_ptr< Message > `[`new_message_from_proto`](#classbonsai_1_1internal_1_1_inkling_message_factory_1aefd2d769dd000cad8b52fcd8ccb53fec)`(DescriptorProto * desc_proto)` | 
`public unique_ptr< Message > `[`message_for_dynamic_message`](#classbonsai_1_1internal_1_1_inkling_message_factory_1ac1eb727c50f24e583f6914a5fbea6525)`(const string & dynamic_message,DescriptorProto * desc_proto)` | 
`public string `[`json_for_message`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a08e3ce29d5f21925a8afc21424cd3b38)`(const string & dynamic_message,DescriptorProto * desc_proto)` | 
`public unique_ptr< Message > `[`message_for_json`](#classbonsai_1_1internal_1_1_inkling_message_factory_1aa520ad06fa422de593b5c77e974df6ce)`(const string & json,DescriptorProto * desc_proto)` | 

## Members

#### `public  `[`InklingMessageFactory`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a9fae8cdecc735af896f8b5c53864ee7f)`()` 

#### `public  `[`~InklingMessageFactory`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a98b6d5f44706c87b8d74fd45fa60a714)`() = default` 

#### `public unique_ptr< Message > `[`new_message_from_proto`](#classbonsai_1_1internal_1_1_inkling_message_factory_1aefd2d769dd000cad8b52fcd8ccb53fec)`(DescriptorProto * desc_proto)` 

#### `public unique_ptr< Message > `[`message_for_dynamic_message`](#classbonsai_1_1internal_1_1_inkling_message_factory_1ac1eb727c50f24e583f6914a5fbea6525)`(const string & dynamic_message,DescriptorProto * desc_proto)` 

#### `public string `[`json_for_message`](#classbonsai_1_1internal_1_1_inkling_message_factory_1a08e3ce29d5f21925a8afc21424cd3b38)`(const string & dynamic_message,DescriptorProto * desc_proto)` 

#### `public unique_ptr< Message > `[`message_for_json`](#classbonsai_1_1internal_1_1_inkling_message_factory_1aa520ad06fa422de593b5c77e974df6ce)`(const string & json,DescriptorProto * desc_proto)` 

# class `bonsai::internal::simulator_ws_impl` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public  `[`simulator_ws_impl`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a032125b8e1aeae87dbf984225d20adcb)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,`[`Simulator`](#classbonsai_1_1_simulator)` * sim,string simulator_name)` | 
`public  `[`~simulator_ws_impl`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a1e312b8c76ca1437311ccb403b10adf6)`()` | 
`public void `[`reset`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a9e0c94a401e358d857d25fcf37a06eb0)`()` | 
`public void `[`connect`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a92d0f5908058244b2fed7256213f8aa3)`()` | 
`public void `[`close`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a05dbecf59a69354cae4e6a65263b1cd8)`()` | 
`public void `[`send`](#classbonsai_1_1internal_1_1simulator__ws__impl_1adf8e911f13d74b9459999fe9d51b6faf)`(const SimulatorToServer & to_server)` | 
`public ServerToSimulator `[`recv`](#classbonsai_1_1internal_1_1simulator__ws__impl_1af69bcb0a6bfe66ee8fa6ff680caf32cf)`()` | 
`public void `[`send_registration`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a325a1b53d28d124b4b48435b0ebd0706)`()` | 
`public void `[`send_ready`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a34549f8703bba2640899f9ed4536442a)`()` | 
`public void `[`send_initial_state`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a83d06108d3baa6497c43b9a1165b18ae)`()` | 
`public void `[`send_state`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a02b8d4df31be33becfd75337121361dd)`()` | 
`public void `[`on_acknowledge_register`](#classbonsai_1_1internal_1_1simulator__ws__impl_1aa4545c8ce0c953210bec2dd6754b8f6e)`()` | 
`public void `[`on_set_properties`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ad9673bfc730cefc4f2a198dafb76ffe0)`()` | 
`public void `[`on_start`](#classbonsai_1_1internal_1_1simulator__ws__impl_1aa8e5c637b62c6a6027f5294d72299813)`()` | 
`public void `[`on_prediction`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a0645604b0bad1066be44e4bf16504d0f)`()` | 
`public void `[`on_reset`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ac253357caa542559e3ebd8295a7d610b)`()` | 
`public void `[`on_stop`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ada6d4292172e42df11e27c7f19b7787e)`()` | 
`public void `[`on_finished`](#classbonsai_1_1internal_1_1simulator__ws__impl_1accd31ab78df8e6cce1ae98ad11084aa3)`()` | 
`public void `[`send_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a1808b185be22f66462062778880ec98a)`()` | 
`public void `[`recv_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a82aef88fa415cc8c433b85119fc424c3)`()` | 
`public unique_ptr< Message > `[`new_state_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1afaab8cfdea81d0a8fe666fa4d0660596)`()` | 
`public bool `[`train`](#classbonsai_1_1internal_1_1simulator__ws__impl_1af31fbe75f8363add6eac550caa985cd9)`(bool training_mode)` | 
`public inline shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a0f62c2ec83cffd0af25bfcd7aa4d4b08)`()` | 
`public inline const string & `[`simulator_name`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a2d33c6f47c843461326134969f398b98)`() const` | 

## Members

#### `public  `[`simulator_ws_impl`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a032125b8e1aeae87dbf984225d20adcb)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,`[`Simulator`](#classbonsai_1_1_simulator)` * sim,string simulator_name)` 

#### `public  `[`~simulator_ws_impl`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a1e312b8c76ca1437311ccb403b10adf6)`()` 

#### `public void `[`reset`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a9e0c94a401e358d857d25fcf37a06eb0)`()` 

#### `public void `[`connect`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a92d0f5908058244b2fed7256213f8aa3)`()` 

#### `public void `[`close`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a05dbecf59a69354cae4e6a65263b1cd8)`()` 

#### `public void `[`send`](#classbonsai_1_1internal_1_1simulator__ws__impl_1adf8e911f13d74b9459999fe9d51b6faf)`(const SimulatorToServer & to_server)` 

#### `public ServerToSimulator `[`recv`](#classbonsai_1_1internal_1_1simulator__ws__impl_1af69bcb0a6bfe66ee8fa6ff680caf32cf)`()` 

#### `public void `[`send_registration`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a325a1b53d28d124b4b48435b0ebd0706)`()` 

#### `public void `[`send_ready`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a34549f8703bba2640899f9ed4536442a)`()` 

#### `public void `[`send_initial_state`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a83d06108d3baa6497c43b9a1165b18ae)`()` 

#### `public void `[`send_state`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a02b8d4df31be33becfd75337121361dd)`()` 

#### `public void `[`on_acknowledge_register`](#classbonsai_1_1internal_1_1simulator__ws__impl_1aa4545c8ce0c953210bec2dd6754b8f6e)`()` 

#### `public void `[`on_set_properties`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ad9673bfc730cefc4f2a198dafb76ffe0)`()` 

#### `public void `[`on_start`](#classbonsai_1_1internal_1_1simulator__ws__impl_1aa8e5c637b62c6a6027f5294d72299813)`()` 

#### `public void `[`on_prediction`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a0645604b0bad1066be44e4bf16504d0f)`()` 

#### `public void `[`on_reset`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ac253357caa542559e3ebd8295a7d610b)`()` 

#### `public void `[`on_stop`](#classbonsai_1_1internal_1_1simulator__ws__impl_1ada6d4292172e42df11e27c7f19b7787e)`()` 

#### `public void `[`on_finished`](#classbonsai_1_1internal_1_1simulator__ws__impl_1accd31ab78df8e6cce1ae98ad11084aa3)`()` 

#### `public void `[`send_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a1808b185be22f66462062778880ec98a)`()` 

#### `public void `[`recv_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a82aef88fa415cc8c433b85119fc424c3)`()` 

#### `public unique_ptr< Message > `[`new_state_message`](#classbonsai_1_1internal_1_1simulator__ws__impl_1afaab8cfdea81d0a8fe666fa4d0660596)`()` 

#### `public bool `[`train`](#classbonsai_1_1internal_1_1simulator__ws__impl_1af31fbe75f8363add6eac550caa985cd9)`(bool training_mode)` 

#### `public inline shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a0f62c2ec83cffd0af25bfcd7aa4d4b08)`()` 

#### `public inline const string & `[`simulator_name`](#classbonsai_1_1internal_1_1simulator__ws__impl_1a2d33c6f47c843461326134969f398b98)`() const` 

# struct `bonsai::internal::simulator_http_impl` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`_brain`](#structbonsai_1_1internal_1_1simulator__http__impl_1ac29448befc5843539b1e91499d421923) | 
`public `[`Simulator`](#classbonsai_1_1_simulator)` * `[`_sim`](#structbonsai_1_1internal_1_1simulator__http__impl_1a73d4efbe539bb242aa5088d5b0cb44f1) | 
`public string `[`_simulator_name`](#structbonsai_1_1internal_1_1simulator__http__impl_1a6c7b62675b7915a71ba74453fe4dec0e) | 
`public string `[`_session_id`](#structbonsai_1_1internal_1_1simulator__http__impl_1ae9bd921c487b05bdb5318407acccd7f2) | 
`public string `[`_session_state`](#structbonsai_1_1internal_1_1simulator__http__impl_1a435d6712659a067210ac89508a042e93) | 
`public string `[`_sim_actions`](#structbonsai_1_1internal_1_1simulator__http__impl_1ae5cfbb54de41a0cf3fc91678ede71565) | 
`public int `[`_sim_step`](#structbonsai_1_1internal_1_1simulator__http__impl_1a8ed599920413d54aa3914bc9cf64ae37) | 
`public string `[`_episode_objective`](#structbonsai_1_1internal_1_1simulator__http__impl_1a97c1931fd8d8b97c7a642be4db84b8ae) | 
`public string `[`_episode_parameters`](#structbonsai_1_1internal_1_1simulator__http__impl_1a4f5fd4bac455e3fd9772aaa04434bc87) | 
`public int `[`_episode_number`](#structbonsai_1_1internal_1_1simulator__http__impl_1a06af1e0d83c5c1394409a3e2869cb57e) | 
`public inline  `[`simulator_http_impl`](#structbonsai_1_1internal_1_1simulator__http__impl_1a7958208bf46155c1d028fcc2ad9291ff)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,`[`Simulator`](#classbonsai_1_1_simulator)` * sim,string simulator_name)` | 
`public void `[`recv_session_response`](#structbonsai_1_1internal_1_1simulator__http__impl_1a4b6e50060d7e368ae64a7f6d06bf6b90)`(const json::value & j)` | 
`public bool `[`send_syncronize`](#structbonsai_1_1internal_1_1simulator__http__impl_1a5bd011f8fbd0b9bbb16376c533e0bcac)`()` | 
`public bool `[`send_episode_start`](#structbonsai_1_1internal_1_1simulator__http__impl_1a8c6a4d44ea24acde434ad37f6df2c5c3)`()` | 
`public bool `[`send_simulate`](#structbonsai_1_1internal_1_1simulator__http__impl_1aa133c6731481760fcd0eec5d4a34606b)`()` | 
`public bool `[`send_connect`](#structbonsai_1_1internal_1_1simulator__http__impl_1ac5a70abb37a3ce1d5de3447d1ce8fda7)`(bool training_mode)` | 
`public bool `[`train`](#structbonsai_1_1internal_1_1simulator__http__impl_1ab48b54dd8810a3c5630ea5f228a5cb40)`(bool training_mode)` | 
`public inline shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#structbonsai_1_1internal_1_1simulator__http__impl_1a9dfa72394fecb6a7970e53f47e84f2a1)`()` | 
`public inline const string & `[`simulator_name`](#structbonsai_1_1internal_1_1simulator__http__impl_1af49be6123e9ca7f1c1285962fb1a6be6)`() const` | 

## Members

#### `public shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`_brain`](#structbonsai_1_1internal_1_1simulator__http__impl_1ac29448befc5843539b1e91499d421923) 

#### `public `[`Simulator`](#classbonsai_1_1_simulator)` * `[`_sim`](#structbonsai_1_1internal_1_1simulator__http__impl_1a73d4efbe539bb242aa5088d5b0cb44f1) 

#### `public string `[`_simulator_name`](#structbonsai_1_1internal_1_1simulator__http__impl_1a6c7b62675b7915a71ba74453fe4dec0e) 

#### `public string `[`_session_id`](#structbonsai_1_1internal_1_1simulator__http__impl_1ae9bd921c487b05bdb5318407acccd7f2) 

#### `public string `[`_session_state`](#structbonsai_1_1internal_1_1simulator__http__impl_1a435d6712659a067210ac89508a042e93) 

#### `public string `[`_sim_actions`](#structbonsai_1_1internal_1_1simulator__http__impl_1ae5cfbb54de41a0cf3fc91678ede71565) 

#### `public int `[`_sim_step`](#structbonsai_1_1internal_1_1simulator__http__impl_1a8ed599920413d54aa3914bc9cf64ae37) 

#### `public string `[`_episode_objective`](#structbonsai_1_1internal_1_1simulator__http__impl_1a97c1931fd8d8b97c7a642be4db84b8ae) 

#### `public string `[`_episode_parameters`](#structbonsai_1_1internal_1_1simulator__http__impl_1a4f5fd4bac455e3fd9772aaa04434bc87) 

#### `public int `[`_episode_number`](#structbonsai_1_1internal_1_1simulator__http__impl_1a06af1e0d83c5c1394409a3e2869cb57e) 

#### `public inline  `[`simulator_http_impl`](#structbonsai_1_1internal_1_1simulator__http__impl_1a7958208bf46155c1d028fcc2ad9291ff)`(shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > brain,`[`Simulator`](#classbonsai_1_1_simulator)` * sim,string simulator_name)` 

#### `public void `[`recv_session_response`](#structbonsai_1_1internal_1_1simulator__http__impl_1a4b6e50060d7e368ae64a7f6d06bf6b90)`(const json::value & j)` 

#### `public bool `[`send_syncronize`](#structbonsai_1_1internal_1_1simulator__http__impl_1a5bd011f8fbd0b9bbb16376c533e0bcac)`()` 

#### `public bool `[`send_episode_start`](#structbonsai_1_1internal_1_1simulator__http__impl_1a8c6a4d44ea24acde434ad37f6df2c5c3)`()` 

#### `public bool `[`send_simulate`](#structbonsai_1_1internal_1_1simulator__http__impl_1aa133c6731481760fcd0eec5d4a34606b)`()` 

#### `public bool `[`send_connect`](#structbonsai_1_1internal_1_1simulator__http__impl_1ac5a70abb37a3ce1d5de3447d1ce8fda7)`(bool training_mode)` 

#### `public bool `[`train`](#structbonsai_1_1internal_1_1simulator__http__impl_1ab48b54dd8810a3c5630ea5f228a5cb40)`(bool training_mode)` 

#### `public inline shared_ptr< `[`Brain`](#classbonsai_1_1_brain)` > `[`brain`](#structbonsai_1_1internal_1_1simulator__http__impl_1a9dfa72394fecb6a7970e53f47e84f2a1)`()` 

#### `public inline const string & `[`simulator_name`](#structbonsai_1_1internal_1_1simulator__http__impl_1af49be6123e9ca7f1c1285962fb1a6be6)`() const` 

# struct `bonsai::internal::simulator_ws_impl::simstep_t` 

## Summary

 Members                        | Descriptions                                
--------------------------------|---------------------------------------------
`public string `[`prediction`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1af15630fbb87bd371f0eed59e307af8ec) | 
`public shared_ptr< Message > `[`state`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1ad51e437dae1773f33fe54ff7a3a0e108) | 
`public float `[`reward`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1a7e0accffa6856c4645b7e4d60b9b9371) | 
`public bool `[`terminal`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1ac7477287487c63999458f49d6afb126b) | 

## Members

#### `public string `[`prediction`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1af15630fbb87bd371f0eed59e307af8ec) 

#### `public shared_ptr< Message > `[`state`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1ad51e437dae1773f33fe54ff7a3a0e108) 

#### `public float `[`reward`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1a7e0accffa6856c4645b7e4d60b9b9371) 

#### `public bool `[`terminal`](#structbonsai_1_1internal_1_1simulator__ws__impl_1_1simstep__t_1ac7477287487c63999458f49d6afb126b) 

Generated by [Moxygen](https://sourcey.com/moxygen)
