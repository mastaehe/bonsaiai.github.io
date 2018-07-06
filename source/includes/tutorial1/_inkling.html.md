# Connecting Your BRAIN

> Adaptation of previous RL image to show the translation onto the Bonsai Platform
> ![Overview Image](../images/tutorial1-overview.png)

To connect our simulation to a BRAIN in the Bonsai platform, we will need an Inkling program that describes the problem and how to teach the AI to solve it. Inkling is a programming language specifically designed for artificial intelligence (AI). It abstracts away the vast world of dynamic AI algorithms that require expertise in machine learning and enables more developers and subject matter experts to create AI.

The problem description includes schemas for the states the BRAIN will receive and the actions it will need to send. The description of how to teach the BRAIN includes the reward, as well as any decomposition of the problem into *concepts* and the sequencing of learning using *lessons*. This first tutorial will use a single concept and a single lesson.

## Schemas

A `schema` in Inkling describes a named record and its contained fields. Each field in a schema has a name and a type. A field may also have a [constraint][1] on values that the data described by this field will take.

#### Exercises

* Fill in the state schema
* Fill in the action schema

###### Fill in the state schema

```inkling--exercise
schema GameState
    # EXERCISE: Add a name (and type) for each variable of x and y position.
    # These have to match the dictionary returned by _get_state() in our simulator.
    # <Your code goes here>
end
```

```inkling--solution
schema GameState
    # X and Y direction of the point. These names (and types) have to match the
    # dictionary returned by _get_state() our simulator.
    Float32 dx,
    Float32 dy
end
```

The state schema describes the state of the environment, and must match the state values returned from the simulator. In this case, the state consists of two floating point numbers, named `dx` and `dy`. Now, fill in the state schema (refer to the [Inkling reference][2] if you're not sure how).

<aside class="notice">
Click the "Solution" tab of the code panel to see the answer to this exercise.
</aside>

###### Fill in the action schema

```inkling--exercise
schema PlayerMove
    # EXERCISE: This name (and type) has to match the parameter to advance() in
    # our simulator. You need to specify the range and step size for the action.
    # <Your code goes here>
end
```

```inkling--solution
schema PlayerMove
    # This name (and type) has to match the parameter to advance() in our
    # simulator. We specify the range and step size for the action.
    Float32{0:1.575:6.283} direction_radians  # a constraint {0,1.575,3.142, 4.712} would also work
end
```

Next, let's fill in the action schema. The action in our problem corresponds to picking a direction, specified as a floating point number in radians, and named `direction_radians`. In this case, we want the system to pick from the four cardinal directions: 0, pi/2, pi, 3\*pi/2. Use the Inkling reference to look up the syntax for schema constraints, and fill in the action schema (bonus: there are at least two ways to do it).

<aside class="notice">
Click the "Solution" tab of the code panel to see the answer to this exercise.
</aside>

## Concepts

```inkling
concept find_the_target
    is classifier      # We're picking one of a few options
    predicts (PlayerMove)
    follows input(GameState)
    feeds output
end
```

A `concept` in Inkling defines what you are going to teach the AI. By declaring a concept, you are instructing the BRAIN server that this a part of the BRAIN's _mental model_ that must be learned. Consequently, concept nodes must have corresponding curricula to teach them.

In this simulation we are asking the agent to learn the concept `find_the_target` by choosing a direction (`predicts (PlayerMove)`) after seeing the current state (`follows input(GameState)`) of the simulation.

For more information about using the concept keyword, refer to the [Concept Reference][3].

## Curriculum and Lessons

```inkling
curriculum learn_curriculum
    # this is the name of our concept from above
    train find_the_target
    # this is our simulator name
    with simulator move_a_point_sim
    # This is the name of our objective function in the simulator
    objective reward_shaped
        lesson get_close 
            configure
                constrain dummy with Int8{-1}
            until
                # This is again the name of the objective function
                maximize reward_shaped
end
```

A `curriculum` in Inkling is used to define what and how to teach a concept. Each concept needs a corresponding curriculum to teach it. A `lesson` is part of a curriculum; it teaches a specific piece of the concept by specifying training and testing parameters and a stopping point (`until`). Lessons enable the BRAIN to learn the concept bit-by-bit instead of all at once (using multiple lessons will be covered in a future tutorial). Lessons are contained within curriculum statements. Each curriculum must contain at least one lesson.

A curriculum contains information the Bonsai AI Engine uses to train your BRAIN on the concept you've specified. They also specify the reward function (`objective`) for teaching a given concept. The reward function is a way the system concretely measures the AI's performance as it learns the concept. For this tutorial we will only using one concept, and therefore, one curriculum. 

Every lesson must have a configuration. In this case, we have a simple example that doesn’t need a configuration, so the config schema is named `dummy` with a default value of `-1` which in this case does nothing to configure the lesson.

For more information about using these keywords, refer to the [Curriculums Reference][4] and [Lessons Reference][5].

# The Inkling/Simulation Relationship

Your Inkling code and your simulation are tightly coupled -- through the SDK bridge class. The Inkling describes what to expect from the simulation as state, and what actions and configurations to send to the simulation. The bridge class does any conversion needed to make this match the simulation. This section describes how the different parts of your Inkling program and your simulation relate to each other through the bridge. The colors in the table below indicate which parts are connected. 

> ![Inkling/Simulator Graphic](../images/tutorial1-inksim.png)

| Color               | Description  |
| -                   | -  |
| Purple (dark/light) | The Inkling state schema field names and types must match the state dictionaries returned from `episode_start` and `simulate` in the simulator. |
| Blue (dark/light)   | The Inkling action schema field names will match the keys in the action dictionary passed to `simulate` in the simulator, and the values will have the types specified in Inkling, and will obey the specified constraints (`{-1, 0, 1}` in the example). |
| Orange (dark/light) | The simulator's configuration passes as `parameters` to the `episode_start`, and will take values from the `constrain` clause in Inkling (if used). |
| Red                 | The name of the concept must match the `train` clause in the curriculum for that concept. |
| Green               | The simulator name must match between the `simulator` clause and the `with simulator` clause in the curriculum. The simulator must pass the same name to the constructor of the `Simulator` class, so the AI engine knows which simulator is connected. |
|Turquoise            | The name of the optimization objective or reward function appears twice in the Inkling, and is available as `self.objective_name` in the simulator. |

<aside class="notice">
Note that config in __main__ is the brain configuration and remains the same throughout, whereas goal_config (highlighted in orange) is used at the beginning of every episode and must be named the same as it is in Inkling. These configs are unrelated.
</aside>

[1]: ../references/inkling-reference.html#constrained-types-and-range-expressions
[2]: ../references/inkling-reference.html#schema-references
[3]: ../references/inkling-reference.html#concepts
[4]: ../references/inkling-reference.html#curriculums
[5]: ../references/inkling-reference.html#lessons
