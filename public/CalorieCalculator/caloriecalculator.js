var male = document.getElementById("male");
var female = document.getElementById("female");
var bodyWeight = document.getElementById("bodyWeight");
var height = document.getElementById("height");
var age = document.getElementById("age");
var activitylevel = document.getElementById("activitylevel");
// var resultarea = document.getElementById("resultarea");
var bmrvalue = document.getElementById("bmrvalue");
var calorievalue = document.getElementById("calorievalue");
var resultCard = document.getElementById("resultCard");

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
    calculateCalories(Math.round( resultBMI * 10) / 10)
    
}

var result;
function calculateCalories(bmi){
    result = bmi * activitylevel.value;
     showResult(Math.round( result * 10) / 10)
}

function showResult(result){
    resultCard.style.display = "block"
    bmrvalue.innerHTML = resultBMI;
    calorievalue.innerHTML = result;
}





