# PatternAi

This is a simple AI that learns how to spit an output from supervised data.  

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

-   ![sigmoid equation](http://latex2png.com/output//latex_0af6f360fcff02afe033d0c48298e3b2.png)

-   ![](http://quicklatex.com/cache3/d8/ql_305dedd0b089ee2f7ad57932934072d8_l3.png)

#### Weight Map

POSITIVE ----> **Matters more**
NEGATIVE ----> **Matters less**


#### TO-DO:

-   [x] Set up randomized pattern generation
-   [x] Be able to activate neurons and adjust weights
-   [x] Forward propagations
-   [ ] Backwards propagations
-   [ ] Iteration function

**NOTE:** I am looking for patterns so the filters/neurons are the patterns
