# PatternAi

This is a simple AI that learns how to spit an output from supervised data. 

The relationship of each individual sets of patterns **is not accounted for**.

| Data Samples |    Input    | Expected Output |
| :----------: | :---------: | :-------------: |
|      #1      | {1,0,1,1,0} |        1        |
|      #2      | {0,0,1,0,0} |        0        |
|      #3      | {1,1,1,0,1} |        1        |
|      #4      | {1,1,0,0,1} |        1        |
|      #5      | {1,0,0,1,1} |        1        |

#### NEW SITUATION

{0,1,0,1,1} --------> OUTPUT = ?  

Notice that the pattern of the EXPECTED OUTPUT is _directly connected_ to the first integer of the INPUT pattern.

**NOTE:** The Pattern can change later on.  
Therefore, OUTPUT = ? = 0.  

### Equations

-   ![Sigmoid equation](http://latex2png.com/output//latex_0af6f360fcff02afe033d0c48298e3b2.png)

-   ![Calculate activation](http://latex.codecogs.com/gif.latex?x%20%3D%20%5Cfrac%7B%5Csum%20%28wa%29%20&plus;%20%5C%20randomized%20%5C%20bias%7D%7Bnumber%20%5C%20of%20%5C%20neurons%7D)
-   ![Nudge Value](http://latex.codecogs.com/gif.latex?%5Clambda%20%28x%29%20%3D%20%5Csum%28x%20-%20t%29%5E%7B2%7D)
-   ![](http://latex.codecogs.com/gif.latex?N%28x%29%3D%20c%20%5Clambda%20%28x%29) 
  
**_// C is the nudge direction, and lambda is the nudge vaue_**
  

### Neuron Layers
    [
        [50 sets of input combinations],
        [193 sets of complex filter combinations]
    ]

## Weight Map

- POSITIVE ----> **Matters more**
- NEGATIVE ----> **Matters less**


**Weight Map Array**

    [
        [ 193 Sets of relational synapses],
        [ 2 sets of 193 synapses]
    ]
    // Relational synapses are the connections between two neurons that are the same.
    // Non-Relational synapses are undecided connections between two synapses.

### Activation Array
    [
        [50 activations],
        [193 activations],
        [2 activations] // [0, 1]
    ]

### Nudge Direction
    [
        [2 nudge directions],
        // Nudge direction at index 0 => '0' connections
        // Nnudge direction at index 1 => '1 conections
        [193 nudge directions] // For each neuron in order
    ]

#### TO-DO:

-   [x] Set up randomized pattern generation
-   [x] Be able to activate neurons and adjust weights
-   [x] Forward propagations
-   [ ] Backwards propagations
-   [ ] Iteration function

**NOTE:** I am looking for patterns so the filters/neurons are the patterns
