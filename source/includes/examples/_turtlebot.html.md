# Gazebo: Turtlebot

> ![Turtlebot Demo Image](../images/bonsai-turtlebot-demo.png)

[**Download the full source code on GitHub**][1] if you want to run this simulator
locally. If you want to run Gazebo Turtlebot remotely on the Bonsai Platform as
a managed simulator (highly recommended), create a new BRAIN selecting the
Gazebo Turtlebot demo on [beta.bons.ai][4].

In this example, we'll walk you through the various Inkling components and
simulation scripts that are part of a sample implementation of training
[Turtlebot][2] to navigate the Willow Garage office on the Bonsai Platform.
Turtlebot is a low-cost mobile base for basic robotics and AI-driven robotics
R&D. This is a real-world example of how to use the Bonsai Platform for robotics
using [Gazebo and ROS][3] (Robotic Operating System).

This Example also includes scripts for integrating Gazebo and ROS into the
Bonsai Platform which can be found below in the [Simulator Files][8] section.

 A graphical display is not part of the Docker container (when training remotely),
 but a Gazebo client may additionally connect to the Gazebo server (that *is*
 part of the container) to visualize the simulation environment.

## Inkling File

###### Schema

```inkling
schema State
    Float32 heading_x,
    Float32 heading_y,
    Float32 heading_yaw,
    Float32 yaw,
    Float32 x,
    Float32 y
end
```

The `State` schema provides the BRAIN with the current x, y coordinates of the
turtlebot, as well as its orientation. We also supply a heading vector to and
relative orientation of the goal with respect to the turlebot. This provides an
invariant representation across goal positions.

```inkling
schema Command
    Float32 lin_vel,
    Float32 ang_vel
end
```

The `Command` schema defines `lin_vel` as the linear velocity and `ang_vel` as
the angular velocity of Turtlebot in the simulation. These are the two actions
that can be taken to move Turtlebot. Our BRAIN will output the desired linear
and angular velocities in m/s and rad/s, respectievly. A PID controller will
make a best effort to achieve these targets within the time limit of the iteration.

```inkling
schema TurtlebotConfig
    Int8 unused
end
```

The `TurtlebotConfig` schema in this case is not used (but is still required to
be defined in Inkling).

###### Concept

```inkling
concept go_to_point is estimator
    predicts (Command)
    follows input(State)
    feeds output
end
```

This concept is named `go_to_point` which predicts a `Command` given a `State`
of the simulation. This concept of `go_to_point` is based on the x, y position
set as the goal.

###### Simulator

```inkling
simulator turtlebot_office_simulator(TurtlebotConfig)
    action (Command)
    state (State)
end
```


The simulator clause declares that a simulator named `turtlebot_office_simulator`
will be connecting to the server for training. This code snippet binds the
previous schemas to this simulator. To define the training relationship between
the simulator and the concept we must begin by defining the simulator.
`turtlebot_office_simulator` expects an action defined in the `Command` schema
as input and replies with a state defined in the `State` schema as output.

###### Curriculum

```inkling
curriculum go_to_point_curriculum
    train go_to_point
    with simulator turtlebot_office_simulator
    objective get_reward
        lesson get_to_point
            configure
                constrain unused with Int8{-1}
            until
                maximize get_reward
end
```

The curriculum `go_to_point_curriculum` trains `go_to_point` using
`turtlebot_office_simulator`. The BRAIN that runs this Inkling code will try to
maximize the value returned from `get_reward` until you stop training.
`get_reward` is a method in the Python simulator.

This curriculum contains one lesson, called `get_to_point`. If used, it would
configure the simulation by setting a number of constraints for the state of
the simulator. In this simple example however, there are no constraints.

## Simulator Files

The three full Python files for this example are with the rest of the
[gazebo-turtlebot-sample code][1] on GitHub.

### bonsai_gazebo.py

> Source code too long to display, please click Github link.

This Python file extends the BonsaiROS interface with methods for controlling
Gazebo simulations in accordance with the Bonsai simulator protocol. 

See the [**bonsai_gazebo.py file**][5] on GitHub.

### bonsai_ros.py

> Source code too long to display, please click Github link.

This Python file mainly contains a class that acts as a basic interface between
ROS and Bonsai's protocols. It can bring up and down the ROS stack and parse a
variety of basic messages.

See the [**bonsai_ros.py file**][6] on GitHub.

### turtlebot_office_experiment.py

> Source code too long to display, please click Github link.

This is a Python simulator for integrating the Gazebo simulator and ROS into
the Bonsai AI Engine. This file repeatedly runs the Gazebo simulator in the
background with new actions sent from the Bonsai AI Engine by passing Turtlebot's
`State` to the backend, and then takes in the `Command` as an input.

See the [**turtlebot_office_experiment.py file**][7] on GitHub.

[1]: https://github.com/BonsaiAI/gazebo-turtlebot-sample
[2]: http://www.turtlebot.com/
[3]: http://gazebosim.org/tutorials?tut=ros_overview
[4]: https://beta.bons.ai/new
[5]: https://github.com/BonsaiAI/gazebo-turtlebot-sample/blob/master/scripts/bonsai_gazebo.py
[6]: https://github.com/BonsaiAI/gazebo-turtlebot-sample/blob/master/scripts/bonsai_ros.py
[7]: https://github.com/BonsaiAI/gazebo-turtlebot-sample/blob/master/scripts/turtlebot_office_experiment.py
[8]: #simulator-files