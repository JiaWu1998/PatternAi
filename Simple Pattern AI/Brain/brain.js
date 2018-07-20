//using ES6, baby!
"use strict";

//pointer for current pattern
let iteration = 0;

//arrays of all patterns 
let patterns = [];

//arrays of correct values
let theCorrectedAnswersToPattern = [];

//arrays of activation values or node values
let activationValuesOfInputNeurons = [];
let activationValuesOfFilterNeurons = [];
let activationValuesOfOutputNeurons = []; 

//arrays for them weight maps
let weightMapsForFilterNeurons = [[],[],[],[],[]];
let weightMapsForOutputNeurons = [[],[]];

//array of all cost
let costArr = [];

//all brain functions --- ALL WEIGHTS AND BIAS RANGE FROM -10 to 10
const getActivationValuesForInputNodes = () => {
    //must be run in a web page 
    //if you want to run it in a terminal with node or something --> install the XMLHTTPREQUEST requirement
    let read = new XMLHttpRequest();
    read.open("GET","../data/data.txt","");
    read.send();
    //read.responseText is the data
    let bigData = (read.responseText).split("\n");
    for(let i=0; i<bigData.length;i++){
        let state1 = bigData[i].split(",");
        theCorrectedAnswersToPattern.push(state1[5]);
        let state2 = [];
        for(let i=0; i<5; i++){
            state2.push(state1[i]);
        }
        patterns.push(state2);
    }
};
const createWeightOrBais = () => {
    let weightOrBias;
    let direction = (Math.random() > 0.5) ? -1 : 1;
    weightOrBias = (Math.random()+0.0000000000000001)*10*direction;
    return weightOrBias;
};
const createAllWeights = () => {
    for(let i=0; i<weightMapsForFilterNeurons.length; i++){
        for(let k=0; k<5; k++){
            weightMapsForFilterNeurons[i].push(createWeightOrBais());
        }
    }
    for(let i=0; i<weightMapsForOutputNeurons.length; i++){
        for(let k=0; k<5; k++){
            weightMapsForOutputNeurons[i].push(createWeightOrBais());
        }
    }
};
const sumForSig = (arrayW, arrayA) => {
    let sum = 0;
    for(let i=0;i<arrayW.length;i++){
        sum += (arrayW[i]*arrayA[i]); 
    }
    sum += createWeightOrBais();
    return sum;
};
const sigmoid = (x) => {1/(1+Math.pow(Math.E,-x))};
const cost = (x,t) => Math.pow((x-t),2);
const avgCost = (costArray) => {
    let sum = 0;
    for(let x in costArray){
        sum += x;
    }
    return sum;
};

//Run these functions only once
createAllWeights();
getActivationValuesForInputNodes();

//MAIN BRAIN FUNCTIONS
// const forwardProp = (thisIteration) => {
//     for(let i=0; i<patterns[thisIteration];i++){
        
//     }
// };
// const backProp = () => {};
// const iterate = () => {
//     forwardProp(iteration);
//     backProp();
//     iteration++;
// };

//PROBLEM: Stuck on ForwardProp