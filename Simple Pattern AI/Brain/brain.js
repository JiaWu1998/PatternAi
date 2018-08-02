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
// all output neurons | total 2 => Layer 2 at index 2

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

//array of all cost
let costArr = [[],[]];
// all neuronCost for all neurons | total 193 neurons => at index 0 
// all outputNeuronCost for all output neurons | total 2 neurons => at index 1

//array of all nudge direction (C) --> 1 or -1
let nudgeDirection = [[],[]];
// all nudgeDirection for mid-high level | total 2 => index 0 
// all nudfeDirection for low-mid level | total 193  => index 1

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
        let dir = (Math.random() > 0.5) ? 1 : -1; 
        nudgeDirection[0].push(dir);
    }
    for(let b=0;b<weightMapLayers[0].length;b++){
        let dir = (Math.random() > 0.5) ? 1 : -1;
        nudgeDirection[1].push(dir);
    }
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
        for(let n=0; n<neurons[0].length;n++){
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
    for(let x in costArray){
        sum += x;
    }
    return sum;
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
// const backProp = () => {

// };
// const iterate = () => {
//     forwardProp(iteration);
//     backProp();
//     iteration++;
//     **clean all the activations and costArr for next set
// };

//PROBLEM: forwardProp --> I got to connect all relationships with first layer and second layer
//PROBlEM: weightMaps all neurons have 50 connections --> no no no ,, only connect those with relationship


//solution 1: get a array with random NUDGE Direction -- done
//solution 2: rebuilt all synapse connections for the low-mid level connection --done
forwardProp(45);
console.log(activationLayers);