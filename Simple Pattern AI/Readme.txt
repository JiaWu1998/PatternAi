This is a simple AI that learns how to spit an output from supervised data.

INPUT----------------------------EXPECTED OUTPUT
Data Sample 1: {1,0,1,1,0}  |   1
Data Sample 2: {0,0,1,0,0}  |   0
Data Sample 3: {1,1,1,0,1}  |   1
Data Sample 4: {1,1,0,0,1}  |   1
Data Sample 5: {1,0,0,1,1}  |   1

NEW SITUATION
{0,1,0,1,1} --------> OUTPUT = ?

Notice that the pattern of the EXPECTED OUTPUT is directly connected to the first int of the INPUT pattern.
*****NOTE: The Pattern can change later on.
Therefore, OUTPUT = ? = 0.

--> SIGMOID ---- S(x) = 1/(1+e^(-x))

x = SIGMA(wa) + randomized bias

Weight Map
POSITIVE ----> MORE to 1
NEGATIVE ----> MORE to 0

[1,0,1,1,0] [1]
[0,0,1,0,0] [0]
[1,1,1,0,1] [1]
[1,0,0,1,1] [1]

***NOTE: I am looking for patterns so the filters/neurons are the patterns
