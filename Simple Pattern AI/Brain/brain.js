//using ES6, baby!
"use strict";

//pointer for current pattern
let iteration = 0;

//arrays of all patterns 
let patterns = [];

//arrays of correct values
let theCorrectedAnswersToPattern = [];

//arrays for them weight maps
let weightMapLayers = [[],[]]; 
// weightMaps for each individual filter neurons | total 193 => layer 0 at index 0
// weightMaps for each individual output neurons | total 2 => layer 1 at index 1

//arrays of activation values
let activationLayers = [[],[],[]]; 
// all basic units for 0(5) and 1(5) and -1(40) | total 50 inputs => Layer 0 at index 0
// all filter neurons | total 193 filter neurons => Layer 1 at index 1
// all output neurons | total 2 => Layer 2 at index 2 [thisIsForZERO, thisIsForOne]

//arrays of all relationships from the mid-low level neurons
let relationshipSynapse = [];
// all positions from neurons[0] that is related to some neuron in neuron[1] | total 193 arrays
//This is ordered by neurons in neurons[1]

//all neuron Layers low-mid layers
let neurons = [
[
["C", "C", "A", "C", "C"],
["C", "C", "C", "B", "C"], 
["C", "C", "C", "A", "C"], 
["A", "C", "C", "C", "C"],
["C", "B", "C", "C", "C"],
["C", "C", "C", "C", "B"],
["C", "C", "C", "C", "A"],
["C", "C", "B", "C", "C"],
["C", "A", "C", "C", "C"],
["B", "C", "C", "C", "C"],
["B", "C", "A", "A", "B"], 
["A", "A", "C", "B", "B"], 
["B", "B", "A", "A", "C"], 
["B", "A", "B", "C", "A"], 
["A", "A", "C", "A", "A"], 
["A", "C", "A", "A", "A"], 
["A", "C", "A", "B", "B"], 
["A", "B", "C", "B", "A"], 
["A", "A", "A", "A", "C"], 
["A", "A", "B", "B", "C"], 
["B", "B", "C", "A", "A"], 
["C", "B", "B", "A", "A"], 
["B", "A", "A", "C", "B"], 
["A", "C", "B", "B", "A"], 
["C", "B", "A", "A", "B"], 
["C", "B", "A", "B", "A"], 
["B", "A", "A", "B", "C"], 
["B", "C", "B", "B", "B"], 
["B", "A", "C", "B", "A"], 
["A", "B", "A", "B", "C"], 
["B", "C", "B", "A", "A"], 
["C", "A", "B", "A", "B"], 
["B", "B", "A", "C", "A"], 
["B", "C", "A", "B", "A"], 
["A", "B", "A", "C", "B"], 
["A", "B", "C", "A", "B"], 
["C", "A", "B", "B", "A"], 
["A", "B", "B", "A", "C"], 
["A", "B", "B", "C", "A"], 
["A", "C", "B", "A", "B"], 
["B", "A", "C", "A", "B"], 
["B", "B", "C", "B", "B"], 
["A", "A", "B", "C", "B"], 
["C", "A", "A", "B", "B"], 
["B", "A", "B", "A", "C"],
["C", "B", "B", "B", "B"],
["B", "B", "B", "C", "B"],
["B", "B", "B", "B", "C"],
["C", "A", "A", "A", "A"],
["A", "A", "A", "C", "A"]
],
[
 ["A", "B", "B", "B", "B"],
 ["C", "B", "C", "B", "C"],
 ["A", "C", "B", "C", "A"],
 ["C", "C", "B", "A", "C"],
 ["A", "C", "C", "B", "B"],
 ["B", "C", "C", "A", "A"],
 ["B", "A", "C", "A", "A"],
 ["A", "C", "A", "C", "B"],
 ["C", "A", "C", "B", "B"],
 ["C", "A", "C", "A", "A"],
 ["B", "A", "A", "A", "C"],
 ["C", "A", "C", "A", "B"],
 ["A", "C", "B", "B", "B"],
 ["B", "C", "B", "C", "C"],
 ["A", "A", "B", "A", "A"],
 ["B", "C", "A", "B", "B"],
 ["B", "A", "C", "B", "B"],
 ["B", "A", "C", "C", "C"],
 ["A", "A", "C", "C", "A"],
 ["B", "B", "C", "A", "B"],
 ["C", "A", "A", "A", "C"],
 ["C", "A", "B", "A", "C"],
 ["C", "C", "A", "C", "A"],
 ["B", "A", "C", "C", "A"],
 ["C", "A", "A", "C", "A"],
 ["A", "B", "C", "C", "A"],
 ["A", "B", "A", "A", "A"],
 ["B", "A", "C", "A", "C"],
 ["A", "C", "B", "A", "C"],
 ["B", "C", "A", "C", "C"],
 ["A", "C", "B", "A", "A"],
 ["A", "C", "A", "A", "C"],
 ["A", "A", "B", "A", "B"],
 ["C", "A", "B", "A", "A"],
 ["B", "A", "B", "C", "B"],
 ["A", "C", "A", "B", "A"],
 ["C", "A", "C", "A", "C"],
 ["A", "C", "C", "C", "B"],
 ["A", "C", "C", "A", "C"],
 ["C", "B", "A", "C", "C"],
 ["A", "B", "A", "A", "C"],
 ["B", "A", "A", "A", "A"],
 ["C", "A", "C", "B", "C"],
 ["C", "A", "C", "C", "A"],
 ["C", "C", "A", "A", "C"],
 ["A", "C", "C", "C", "A"],
 ["C", "C", "B", "C", "A"],
 ["C", "B", "A", "C", "B"],
 ["A", "C", "C", "A", "A"],
 ["A", "B", "C", "A", "C"],
 ["A", "A", "A", "B", "C"],
 ["B", "B", "C", "C", "B"],
 ["C", "B", "B", "C", "A"],
 ["A", "A", "C", "B", "C"],
 ["B", "C", "B", "B", "C"],
 ["B", "A", "B", "A", "B"],
 ["A", "B", "C", "C", "B"],
 ["B", "B", "A", "C", "C"],
 ["A", "C", "A", "A", "B"],
 ["B", "B", "C", "B", "A"],
 ["C", "A", "B", "C", "B"],
 ["A", "B", "B", "A", "B"],
 ["C", "A", "A", "C", "C"],
 ["C", "A", "A", "B", "A"],
 ["C", "C", "A", "B", "B"],
 ["A", "C", "A", "C", "C"],
 ["A", "B", "A", "C", "C"],
 ["B", "A", "B", "B", "A"],
 ["C", "B", "A", "B", "B"],
 ["C", "A", "A", "B", "C"],
 ["C", "B", "B", "B", "A"],
 ["A", "B", "B", "C", "B"],
 ["B", "A", "A", "C", "A"],
 ["C", "B", "B", "A", "B"],
 ["B", "B", "B", "C", "C"],
 ["C", "B", "A", "C", "A"],
 ["A", "A", "A", "B", "B"],
 ["A", "B", "B", "B", "A"],
 ["B", "C", "A", "C", "A"],
 ["B", "C", "B", "A", "C"],
 ["C", "C", "A", "B", "C"],
 ["A", "B", "A", "C", "A"],
 ["A", "B", "C", "B", "B"],
 ["C", "B", "B", "A", "C"],
 ["B", "B", "C", "C", "A"],
 ["A", "C", "B", "B", "C"],
 ["C", "B", "C", "C", "A"],
 ["A", "A", "A", "B", "A"],
 ["C", "C", "B", "C", "B"],
 ["B", "A", "A", "C", "C"],
 ["A", "A", "B", "B", "A"],
 ["C", "C", "A", "A", "B"],
 ["B", "C", "A", "C", "B"],
 ["B", "B", "B", "A", "A"],
 ["B", "B", "A", "B", "C"],
 ["C", "C", "A", "C", "B"],
 ["A", "B", "B", "C", "C"],
 ["B", "C", "B", "A", "B"],
 ["B", "C", "C", "B", "B"],
 ["C", "B", "B", "C", "C"],
 ["A", "A", "A", "C", "B"],
 ["A", "A", "C", "A", "C"],
 ["C", "C", "B", "B", "B"],
 ["B", "C", "B", "B", "A"],
 ["A", "A", "B", "A", "C"],
 ["B", "B", "B", "B", "B"],
 ["C", "C", "B", "A", "A"],
 ["B", "B", "B", "B", "A"],
 ["A", "C", "C", "A", "B"],
 ["C", "A", "A", "A", "B"],
 ["C", "A", "B", "B", "C"],
 ["C", "B", "A", "A", "A"],
 ["C", "B", "B", "B", "C"],
 ["C", "A", "B", "C", "C"],
 ["A", "A", "A", "C", "C"],
 ["A", "A", "C", "C", "B"],
 ["C", "C", "C", "A", "B"],
 ["B", "C", "C", "C", "A"], 
 ["B", "A", "C", "B", "C"],
 ["B", "C", "C", "A", "B"],
 ["C", "A", "B", "C", "A"],
 ["A", "A", "B", "C", "C"],
 ["C", "B", "A", "B", "C"],
 ["C", "A", "C", "B", "A"],
 ["B", "A", "B", "C", "C"],
 ["C", "B", "C", "A", "A"],
 ["A", "B", "A", "A", "B"],
 ["B", "C", "C", "A", "C"],
 ["A", "A", "C", "A", "B"],
 ["A", "B", "C", "C", "C"],
 ["C", "C", "C", "A", "A"],
 ["B", "C", "B", "C", "A"],
 ["A", "C", "B", "C", "B"],
 ["A", "B", "A", "B", "A"], 
 ["C", "C", "B", "A", "B"],
 ["B", "B", "B", "A", "B"], 
 ["C", "C", "A", "A", "A"],
 ["B", "B", "A", "A", "A"],
 ["A", "C", "B", "C", "C"],
 ["A", "C", "A", "B", "C"], 
 ["A", "A", "C", "B", "A"],
 ["A", "A", "A", "A", "B"],
 ["B", "C", "C", "B", "A"],
 ["A", "A", "B", "C", "A"],
 ["C", "C", "A", "B", "A"],
 ["C", "C", "C", "B", "A"],
 ["B", "B", "C", "A", "C"],
 ["B", "B", "B", "C", "A"],
 ["A", "A", "A", "A", "A"],
 ["C", "B", "C", "B", "A"],
 ["B", "A", "C", "C", "B"],
 ["A", "B", "C", "B", "C"],
 ["A", "A", "C", "C", "C"],
 ["A", "B", "B", "A", "A"],
 ["B", "A", "B", "B", "C"],
 ["B", "C", "C", "B", "C"],
 ["B", "A", "A", "B", "A"],
 ["C", "C", "C", "B", "B"],
 ["C", "B", "C", "C", "B"],
 ["B", "C", "A", "A", "A"],  
 ["A", "C", "C", "B", "C"],
 ["A", "A", "B", "B", "B"],
 ["B", "A", "B", "A", "A"],
 ["A", "B", "C", "A", "A"],
 ["B", "B", "C", "C", "C"],
 ["A", "C", "C", "B", "A"],
 ["C", "C", "C", "C", "C"],
 ["B", "B", "A", "A", "B"],
 ["A", "B", "B", "B", "C"],
 ["C", "A", "A", "C", "B"],
 ["B", "B", "A", "B", "B"],
 ["B", "A", "A", "A", "B"],
 ["A", "C", "A", "C", "A"],
 ["B", "A", "A", "B", "B"],
 ["C", "A", "B", "B", "B"],
 ["C", "B", "C", "A", "B"],
 ["C", "A", "C", "C", "B"],
 ["B", "B", "A", "B", "A"],
 ["B", "B", "A", "C", "B"],
 ["B", "C", "A", "A", "C"],
 ["B", "A", "B", "B", "B"],
 ["C", "B", "C", "B", "B"],
 ["B", "C", "A", "B", "C"],
 ["A", "B", "A", "B", "B"],
 ["C", "B", "B", "C", "B"],
 ["C", "C", "B", "B", "C"],
 ["B", "C", "C", "C", "B"],
 ["B", "B", "C", "B", "C"],
 ["C", "B", "C", "A", "C"],
 ["B", "B", "B", "A", "C"],
 ["C", "C", "B", "B", "A"],
 ["B", "C", "B", "C", "B"],
 ["C", "B", "A", "A", "C"]
]
];
//input layer | total 50 => Layer 0 at index 0
//filter layer | total 193 => Layer 1 at index 1

//array of all nudge direction (C) --> 1 or -1
let nudgeDirection = [[[],[]],[]];
// array of nudgeDirections for 193 connections from output 0 and 1 to the mid level => index 0 => inside array at index 0 => index 0 is the connection from output 0 to 193 filter neurons and index 1 is the connection from output 1 to 193 filter neurons
// arrays of nudgeDirections for 193 neurons to how ever many relational synapses => index 1 

//all brain functions --- ALL WEIGHTS AND BIAS RANGE FROM -10 to 10
const getAllTrainingData = () => {
    //must be run in a web page 
    //if you want to run it in a terminal with node or something --> install the XMLHTTPREQUEST requirement
    let read = new XMLHttpRequest();
    read.open("GET","../data/data.txt","");
    read.send();
    //read.responseText is the data
    let bigData = (read.responseText).split("\n");
    for(let i=0; i<bigData.length;i++){
        let state1 = bigData[i].split(",");
        theCorrectedAnswersToPattern.push(parseInt(state1[5]));
        let state2 = [];
        for(let i=0; i<5; i++){
            state2.push(parseInt(state1[i]));
        }
        patterns.push(state2);
    }
};
const startGuessNudgeDirection = () => {
    for(let d=0; d<weightMapLayers[1].length; d++){
        let arrN = [];
        for(let g=0; g<weightMapLayers[1][d].length;g++){
            let dir = (Math.random() > 0.5) ? 1 : -1;
            arrN.push(dir); 
        }
        nudgeDirection[0][d].push(arrN);
    }
    for(let b=0;b<weightMapLayers[0].length;b++){
        let arrN = [];
        for(let q=0; q<weightMapLayers[0][b].length;q++){
            let dir = (Math.random() > 0.5) ? 1 : -1;
            arrN.push(dir);
        }
        nudgeDirection[1].push(arrN);
    }
};
const eraseActivations = () => {
    activationLayers = [[],[],[]];
};
const createWeightOrBais = () => {
    let weightOrBias;
    let direction = (Math.random() > 0.5) ? -1 : 1;
    weightOrBias = (Math.random()+0.0000000000000001)*10*direction;
    return weightOrBias;
};
const findAllRelation  = () => {
    for(let s=0; s<neurons[1].length; s++){
        let relationships = [];
        for(let e=0; e<neurons[0].length; e++){
            let count = 0;
            for(let w=0; w<neurons[0][e].length; w++){
                if((neurons[1][s][w] == neurons[0][e][w]) || (neurons[1][s][w] == "C") || (neurons[0][e][w] == "C")){
                    count ++;
                }
            } 
            if(count == 5){
                relationships.push(e);
            }
        }
        relationshipSynapse.push(relationships);
    }
};
const createAllWeightMaps = () => {
    let weightMap;
    //create relationship synapses
    for(let i=0; i<neurons[1].length;i++){
        weightMap = [];
        for(let q=0; q<relationshipSynapse[i].length;q++){
            weightMap.push(createWeightOrBais());
        }
        weightMapLayers[0].push(weightMap);
    }

    //create mystery synapses 
    for(let i=0; i<2;i++){
        weightMap = [];
        for(let n=0; n<neurons[1].length;n++){
            weightMap.push(createWeightOrBais());
        }
        weightMapLayers[1].push(weightMap);
    }
};
//input an array of weights and an array of activations and outputs sum of all connections
const avgForSig = (arrayW, arrayA) => {
    let sum = 0;
    let avg = 0;
    for(let i=0;i<arrayW.length;i++){
        sum += (arrayW[i]*arrayA[i]); 
    }
    sum += createWeightOrBais();
    avg = sum / (arrayW.length + 1);
    return avg;
};
//inputs sum of all connections and outputs sigmoid value or neuron value
const sigmoid = (x) => 1/(1+Math.pow(Math.E,-x));
//inputs neuron value and target value and outputs cost
const cost = (x,t) => Math.pow((x-t),2);
//inputs array of all cost and inputs avgCost
const avgCost = (costArray) => {
    let sum = 0;
    for(let j=0; j<costArray.length; j++){
        sum += costArray[j];
    }
    return sum/costArray.length;
};
//inputs alpha from neuron and translates to 1, 0, or -1
const typeOfData = (alpha) => {
    switch(alpha){
        case "A" : 
            return 1;
            break;
        case "B" : 
            return 0;
            break;
        case "C" :
            return -1;
            break;
    }
};

//Run these functions only once
getAllTrainingData();
findAllRelation();
createAllWeightMaps();
startGuessNudgeDirection();

//MAIN BRAIN FUNCTIONS
const forwardProp = (thisIteration) => {
    //first - get activation for all input neurons
    for(let i=0;i<neurons[0].length;i++){
        let count = 0;
        let activation = 0;
        let translation = [];

        for(let g=0; g<neurons[0][i].length; g++){
            translation.push(typeOfData(neurons[0][i][g]));
        }
        for(let j=0; j<translation.length; j++){
            count = ((patterns[thisIteration][j] == translation[j]) || translation[j] == -1) ? count + 1 : count;
        }
        activation = (count == 5) ? 1 : 0; 
        activationLayers[0].push(activation);
    }

    //second - calculate all activationValues for all filter neurons
    for(let f=0; f<weightMapLayers[0].length; f++){
        activationLayers[1].push(sigmoid(avgForSig(weightMapLayers[0][f],activationLayers[0])));
    }
    //third - calculate all activationValues for all output neurons 
    for(let m=0; m<weightMapLayers[1].length; m++){
        activationLayers[2].push(sigmoid(avgForSig(weightMapLayers[1][m],activationLayers[1])));
    }
};
const backProp = (thisIterationAgain) => {
    let targetOutputs = []; // [thisIsForZERO,thisIsForONE]
    let targetFilters = []; // list of targets for neuron[1] in order
    let costs = []; // [costForHighToMidLevel, costForMidToLowLevel]

    targetOutputs = (theCorrectedAnswersToPattern[thisIterationAgain] == 1) ? [0,1] : [1,0];
    for(let v=0; v<activationLayers[1].length; v++){
        let count = 0;
        for(let e=0; e<neurons[1][v].length; e++){
            count = ((patterns[v][e] == typeOfData(neurons[1][v][e])) || neurons[1][v][e] == "C") ? count + 1 : count; 
        }
        if(count == 5){
            targetFilters.push(1);
        }else{
            targetFilters.push(0);
        }
    }

    //first -- calculate the cost for the high-mid level
    let costLayer = [];
    for(let n=0; n<activationLayers[2].length; n++){
        costLayer.push(cost(activationLayers[2][n],targetOutputs[n]));
    }
    costs.push(avgCost(costLayer));
    // second -- calculate the cost for the mid-low level 
    costLayer = [];
    for(let x=0; x<activationLayers[1].length;x++){
        costLayer.push(cost(activationLayers[1][x],targetFilters[x]));
    }
    costs.push(avgCost(costLayer));

    //Now find the best nudge Map!!!!
    let correct = [];
    correct = (theCorrectedAnswersToPattern[thisIterationAgain] == 1) ? [0,1] : [1,0];
    let weightMapCopy = weightMapLayers.slice(0);
    
    //this format is for nudgeDirection[0]
    for(let j=0 ; j<nudgeDirection[0].length; j++){
        for(let m=0; m<nudgeDirection[0][j].length; m++){
            for(let q=0; q<nudgeDirection[0][j][m].length; q++){
                let current = activationLayers[2];
                nudgeDirection[0][j][m][q] = -nudgeDirection[0][j][m][q];
                
                //let's change all the weights, starting with the high-mid level #COPY
                for(let y=0; y<weightMapCopy[1].length;y++){
                    for(let d=0; d<weightMapCopy[1][y].length; d++){
                        if(!(weightMapCopy[1][y][d] + (nudgeDirection[0][y]*costs[0]) > 10) || !(weightMapCopy[1][y][d] + (nudgeDirection[0][y]*costs[0]) < -10)){
                            weightMapCopy[1][y][d] = weightMapCopy[1][y][d] + (nudgeDirection[0][y]*costs[0]);
                        }
                    }
                }
                //changing the weights in low-mid level #COPY
                for(let z=0; z<weightMapCopy[0].length;z++){
                    for(let f=0; f<weightMapCopy[0][z].length; f++){
                        if(!(weightMapCopy[0][z][f] + (nudgeDirection[1][z]*costs[1]) > 10) || !(weightMapCopy[0][z][f] + (nudgeDirection[1][z]*costs[1]) < -10)){
                            //console.log(weightMapLayers[0][z][f] + "before"); --> shows before weight change
                            weightMapCopy[0][z][f] = weightMapCopy[0][z][f] + (nudgeDirection[1][z]*costs[1]);
                            //console.log(weightMapLayers[0][z][f] + "after"); --> shows after weight change
                        }
                    }
                }
                eraseActivations();
                forwardProp(thisIterationAgain);

                let calculated = activationLayers[2];

                //Now compare results and decide on best nudge Map
                let differenceCurrentToCorrect = [];
                let differenceCalculatedToCorrect = [];
                for(let m=0; m<calculated.length;m++){
                    differenceCurrentToCorrect[m] = Math.abs(correct[m] - current[m]);
                    differenceCalculatedToCorrect[m] = Math.abs(correct[m] - calculated[m]);
                }
                if((differenceCurrentToCorrect[0]+differenceCurrentToCorrect[1]) < (differenceCalculatedToCorrect[0]+differenceCalculatedToCorrect[1])){
                    nudgeDirection[0][j][m][q] = -nudgeDirection[0][j][m][q];
                    eraseActivations();
                    forwardProp(thisIterationAgain);
                }
            }
        }
    }
    //this format is for nudgeDirection[1] because [0] and [1] has different format
    

    //CHANGE WEIGHT MAP HERE
    //finally, let's change all the weights, starting with the high-mid level
    for(let y=0; y<weightMapLayers[1].length;y++){
        for(let d=0; d<weightMapLayers[1][y].length; d++){
            if(!(weightMapLayers[1][y][d] + (nudgeDirection[0][y]*costs[0]) > 10) || !(weightMapLayers[1][y][d] + (nudgeDirection[0][y]*costs[0]) < -10)){
                weightMapLayers[1][y][d] = weightMapLayers[1][y][d] + (nudgeDirection[0][y]*costs[0]);
            }
        }
    }
    //changing the weights in low-mid level
    for(let z=0; z<weightMapLayers[0].length;z++){
        for(let f=0; f<weightMapLayers[0][z].length; f++){
            if(!(weightMapLayers[0][z][f] + (nudgeDirection[1][z]*costs[1]) > 10) || !(weightMapLayers[0][z][f] + (nudgeDirection[1][z]*costs[1]) < -10)){
                //console.log(weightMapLayers[0][z][f] + "before"); --> shows before weight change
                weightMapLayers[0][z][f] = weightMapLayers[0][z][f] + (nudgeDirection[1][z]*costs[1]);
                //console.log(weightMapLayers[0][z][f] + "after"); --> shows after weight change
            }
        }
    }
};
const iterate = () => {
    forwardProp(iteration);
    backProp(iteration);
    iteration++;
    eraseActivations();
};

//FINAL PROBLEM: changing the nudgeDirection --> *** BIG ASS PROBLEM ***
//Grand Solution: In backProp() -> for the nudgeDirection array -> do the calculation and compare method 

//New Problem: there is only 193*2 nudge directions for the mid to high level cause those are 
//the nudge directions that we dont know or mystery connections

//gotta change structure of backprop cause nudge direction is used there
forwardProp(iteration);
backProp(iteration);

console.log(weightMapLayers);
console.log(activationLayers);
console.log(nudgeDirection);
console.log(nudgeDirection[1]);

