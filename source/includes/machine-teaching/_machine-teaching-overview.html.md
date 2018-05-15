# Machine Teaching Overview

Machine teaching comprises programming a BRAIN to learn to control or optimize a complex system by outlining details of the system and providing strategies for how the BRAIN should learn. 

In this guide you will learn about the different components of programming machine teaching, where they currently reside in the platform, and how to transform them from one to the other. This guide will also cover constructing reward functions, terminal conditions, logging your output, and different types of simulator patterns you may be programming for.  First, let’s start with our approach for machine teaching: 

1. **Describe the problem.**  The first step in machine teaching is to clearly describe the system that you will train the BRAIN to control or optimize.
2. **Identify the learning objectives.**  Learning objectives are the sub-skills that you want the BRAIN to learn in order to master control of the system.  The process of identifying learning objectives helps organize the machine teaching process before diving into the details. 
3. **Outline your teaching methods and lesson plan.**  After you have identified your learning objectives, decide how you want to teach each objective.  For example, some learning objectives might be taught with Deep Reinforcement Learning, some learning objectives might be fulfilled using existing control algorithms or other machine learning approaches, other learning objectives might be described using rules or heuristics. 

## Components of Machine Teaching

>![Machine Teaching Flow](../images/machine-teaching-flow.png)

Some of the programming for machine teaching resides in Inkling, a new machine teaching language, and the rest resides in Python.  The STAR (State, Terminal, Action, Reward) components in Python are part of the connection between the Simulator and the Bonsai Platform that focuses on machine teaching as opposed to simulator mechanics.  For example, you may use a Python script to connect your simulation model to the Platform using the Bonsai SDK.  Some of the functions in your Python script handle communication with your simulation model.  Other functions are dedicated to machine teaching.  

### Terminology

The following table describes the key aspects of programming Machine Teaching on the Bonsai platform and where each aspect is programmed. 

|   | Inkling  | Python |
| - | -        | -      |
| **S**tate | State definition describes variables that represent the state of the system at each time step. | State transformations modify the state given by the simulation model for more efficient deep reinforcement learning. |
| **T**erminal Condition | | Terminal conditions specify when to end an episode.
| **A**ction | Action definition describes which actions the BRAIN is learning to control in the system. | Action transformations modify the action space. |
| **R**eward Function | | Reward functions allocate reward to the BRAIN based on how well it optimized the system toward the objective. |
| Concepts | Concepts are sub-skills that the BRAIN will learn that help it control or optimize the system. | |
| Lessons | Lessons guide the BRAIN through phased training sequences. | |
| Lesson Configurations | | Lesson configurations pass data about initial conditions from the lesson plan to the simulator. |
| Logging | | Logging documents training results at each time step (iteration) and training pass (episode) in the terminal and log files. |

