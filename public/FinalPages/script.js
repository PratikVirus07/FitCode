var male = document.getElementById("male");
var female = document.getElementById("female");
var bodyWeight = document.getElementById("bodyWeight");
var height = document.getElementById("height");
var age = document.getElementById("age");
var activitylevel = document.getElementById("activitylevel");
var bmrvalue = document.getElementById("bmrvalue");
var calorievalue = document.getElementById("calorievalue");
var resultCard = document.getElementById("resultCard");
var proteinvalueid = document.getElementById("proteinvalueid");
var fatvalueid = document.getElementById("fatvalueid");
var carbsvalueid = document.getElementById("carbsvalueid");
var goalselection = document.getElementById("goalselection");
var reqdvalue = document.getElementById("reqdvalue");
// var musclegain = document.getElementById("musclegain");
// var fatloss = document.getElementById("fatloss");
// var befit = document.getElementById("befit");
// var getstronger = document.getElementById("getstronger");
// var endurance = document.getElementById("endurance");
// var conditioning = document.getElementById("conditioning");



var resultBMI;
function calculateBMIandCalories(){
    if (male.checked)
    {
        resultBMI = 66.5 + (13.75 * bodyWeight.value) + (5.003 * height.value) - (6.755 * age.value);
    }
    if (female.checked)
    {
        resultBMI = 655.1 + (9.563 * bodyWeight.value) + (1.850 * height.value) - (4.676 * age.value);
    }
    calculateCalories(resultBMI)
}

var result;
function calculateCalories(bmi){
    result = bmi * activitylevel.value;

     showResult(Math.round( result * 10) / 10)
}


async function showResult(result){
    var caloriesreqd = result*(goalselection.value);
    console.log(caloriesreqd)
    let protienvalue = await proteincalculate(caloriesreqd)
    let carbsvalue = await carbscalculate(caloriesreqd)
    let fatvalue = await fatcalculate(caloriesreqd)
    resultCard.style.display = "block"
    calorievalue.innerHTML = result;
    proteinvalueid.innerHTML = Math.round( protienvalue * 10) / 10;;
    fatvalueid.innerHTML = Math.round( fatvalue * 10) / 10;;
    carbsvalueid.innerHTML = Math.round( carbsvalue * 10) / 10;;
    reqdvalue.innerHTML = Math.round( caloriesreqd * 10) / 10;
}


function proteincalculate(caloriesreqd){
    var myProtienValue;
    if(goalselection.value == 1.2){
        myProtienValue= (caloriesreqd * 0.3 )/4;
    }else if(goalselection.value == 0.8){
        myProtienValue= (caloriesreqd * 0.4 )/4;
    } else if(goalselection.value == 1){
        myProtienValue= (caloriesreqd * 0.3 )/4;
    } else if(goalselection.value == 1.4){
        myProtienValue= (caloriesreqd * 0.25 )/4;
    } else if(goalselection.value == 1){
        myProtienValue= (caloriesreqd * 0.4 )/4;
    } else if(goalselection.value == 0.9){
        console.log("hey")
        myProtienValue= (caloriesreqd * 0.45 )/4;
    }
    return myProtienValue;
}

function carbscalculate(caloriesreqd){
    var myCarbsValue;
    if(goalselection.value == 1.2){
        myCarbsValue= (caloriesreqd * 0.5 )/4;
    }else if(goalselection.value == 0.8){
        myCarbsValue= (caloriesreqd * 0.3 )/4;
    } else if(goalselection.value == 1){
        myCarbsValue= (caloriesreqd * 0.45 )/4;
    } else if(goalselection.value == 1.4){
        myCarbsValue= (caloriesreqd * 0.5 )/4;
    } else if(goalselection.value == 1){
        myCarbsValue= (caloriesreqd * 0.3 )/4;
    } else if(goalselection.value == 0.9){
        myCarbsValue= (caloriesreqd * 0.2 )/4;
    }
    return myCarbsValue;
}

function fatcalculate(caloriesreqd){
    var myFatValue;
    if(goalselection.value == 1.2){
        myFatValue= (caloriesreqd * 0.2 )/8;
    }else if(goalselection.value == 0.8){
        myFatValue= (caloriesreqd * 0.3 )/8;
    } else if(goalselection.value == 1){
        myFatValue= (caloriesreqd * 0.25 )/8;
    } else if(goalselection.value == 1.4){
        myFatValue= (caloriesreqd * 0.25 )/8;
    } else if(goalselection.value == 1){
        myFatValue= (caloriesreqd * 0.3 )/8;
    } else if(goalselection.value == 0.9){
        myFatValue= (caloriesreqd * 0.35 )/8;
    }
    return myFatValue;
}
