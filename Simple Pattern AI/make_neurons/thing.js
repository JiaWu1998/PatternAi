 "use strict";
const createAllPossibleNeurons = () => {
    let combinationList = []; 
    let max = 243;

    while(combinationList.length < max){
        let combination = [];
        for(let i=0;i<5;i++){
            let randomChance = Math.random();
            if(randomChance>0.6){
                combination.push("A");
            }else if((randomChance>0.3) && (randomChance<=0.6)){
                combination.push("B");
            }else{
                combination.push("C");
            }
        }
        let notIn = true;
        for(let i=0; i<combinationList.length;i++){
            let count = 0;
            if(combinationList[i][0] == combination[0]){count++;};
            if(combinationList[i][1] == combination[1]){count++;};
            if(combinationList[i][2] == combination[2]){count++;};
            if(combinationList[i][3] == combination[3]){count++;};
            if(combinationList[i][4] == combination[4]){count++;};
            if(count == 5){notIn = false;};
        }
        if(notIn == true){
            combinationList.push(combination);
        }
    }
    console.log(combinationList);
};

createAllPossibleNeurons();