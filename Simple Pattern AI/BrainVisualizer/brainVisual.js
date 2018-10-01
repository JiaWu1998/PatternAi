let yPos = [];
function setup(){
    createCanvas(800, 800,WEBGL);
    let c = -200
    for(let x=0; x<weightMapLayers[1][0].length;x++){
        c += (x*5)
        yPos.push(c);
    }
}
function draw(){
    background(0)
    iterate();
    orbitControl();
    for(let x=0; x<weightMapLayers[1][0].length;x++){
        makeAneuron(weightMapLayers[1][0][x],[0,yPos[x],0]);
    }
}
function makeAneuron(neuron,position){
    translate(position[0],position[1],position[2]);
    if(neuron<0){
        fill(0,0,255);
    }else{
        fill(0,255,0);
    }
    box(10,10,neuron*40);
}