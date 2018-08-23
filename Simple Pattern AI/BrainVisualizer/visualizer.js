/* TODO:
    1. Retrieve node value from html 'id'.
    2. Use node value to chage opacity of lines connecting to the neurons.
*/

let uSize = 30;
let xAxis;
let yAxis;

function makeNeuron(x, y, uniformSize, activate){
    ellipseMode(CENTER);
    ellipse(x, y, uniformSize, uniformSize);
    textSize(16);
    fill(0);
    textAlign(CENTER);
    text(activate, x, y);
}

function activation(activate){
    
}

function setup() {
    // put setup code here
    createCanvas(1000, 1000);
    background(255);

    
    makeNeuron(width/2, height/2, 50, 0);

    // Input layer
    // xAxis = 100;
    // yAxis = 3000;
    // for (let i = 0; i < 50; i++) {
    //     ellipseMode(CENTER);
    //     ellipse(xAxis, yAxis, uSize, uSize);
    //     yAxis += 40;
    // }

    // // Middle-layer
    // xAxis = 600;
    // yAxis = 60;
    // for (let j = 0; j < 193; j++) {
    //     ellipseMode(CENTER);
    //     ellipse(xAxis, yAxis, uSize, uSize);
    //     yAxis += 40;
    // }

    // // Output layer
    // xAxis = 900;
    // yAxis = 3940;
    // for (let k = 0; k < 2; k++) {
    //     ellipseMode(CENTER);
    //     ellipse(xAxis, yAxis, uSize, uSize);
    //     yAxis += 40;
    // }

}

function draw() {
    // put drawing code here

}

