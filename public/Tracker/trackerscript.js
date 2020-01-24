var foodid = document.getElementById("foodid");
var quantityid = document.getElementById("quantityid");
var servingunitid = document.getElementById("servingunitid");
var protienid = document.getElementById("protienid");
var carbsid = document.getElementById("carbsid");
var totalfatid = document.getElementById("totalfatid");
var saturatedfatid = document.getElementById("saturatedfatid");
var sugarid = document.getElementById("sugarid");
var caloriesid = document.getElementById("caloriesid");
var resultdiv = document.getElementById("resultdiv");

var exerciseid = document.getElementById("exerciseid");
var ageid = document.getElementById("ageid");
var genderid = document.getElementById("genderid");
var heightid = document.getElementById("heightid");
var weightid = document.getElementById("weightid");

var exercisevaluecalories = document.getElementById("exercisevaluecalories");
var exerciseresults = document.getElementById("exerciseresults");
var exercisevaluetime = document.getElementById("exercisevaluetime");



async function foodsearchbuttonidclicked(){
    var foodvalue = foodid.value;
    // console.log(foodvalue)
    var fetchedData;
    if(foodvalue){
        let myfoodquerybody = JSON.stringify({
            "query":foodvalue
        })
        let res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
            method:"POST",
            body:myfoodquerybody,
            headers:{
                "Content-Type":"application/json",
                'x-app-id': '196643c6',
                'x-app-key': '3aaab5f19e026b32111ca6cb4480dee7'
            }
        }).then(res => {
            let data = res.json();
            // console.log(data);
            return data;
        }).then(res => {
             fetchedData = res;
            console.log(fetchedData)
        })
        var myCalories = fetchedData.foods[0].nf_calories;
        var myQuantity = fetchedData.foods[0].serving_qty;
        var myServingUnit = fetchedData.foods[0].serving_unit;
        var myProtien = fetchedData.foods[0].nf_protein;
        var myCarbs = fetchedData.foods[0].nf_total_carbohydrate;
        var myTotalFat = fetchedData.foods[0].nf_total_fat;
        var mySaturatedFat = fetchedData.foods[0].nf_saturated_fat;
        var mySugar = fetchedData.foods[0].nf_sugars;

        resultdiv.style.display="block";
        quantityid.innerHTML= myQuantity;
        servingunitid.innerHTML= myServingUnit;
        protienid.innerHTML= myProtien;
        carbsid.innerHTML= myCarbs;
        totalfatid.innerHTML= myTotalFat;
        saturatedfatid.innerHTML= mySaturatedFat;
        sugarid.innerHTML= mySugar;
        caloriesid.innerHTML = myCalories;
    }
    
}


async function exercisebuttonclicked(){
    var exerciseidvalue = exerciseid.value;
    var ageidvalue = ageid.value;
    var genderidvalue = genderid.value;
    var heightidvalue = heightid.value;
    var weightidvalue = weightid.value;
    var exercisefetcheddata;
    console.log("hey")
    let myexercisequery = JSON.stringify({
        "query":exerciseidvalue,
        "gender":genderidvalue,
        "weight_kg":weightidvalue,
        "height_cm":heightidvalue,
        "age":ageidvalue
       })

    let res = await fetch("https://trackapi.nutritionix.com/v2/natural/exercise", {
        method:"POST",
        body:myexercisequery,
        headers:{
            "Content-Type":"application/json",
            'x-app-id': '196643c6',
            'x-app-key': '3aaab5f19e026b32111ca6cb4480dee7'
        }
    }).then(res => {
        let data = res.json();
        return data;
    }).then(res => {
        exercisefetcheddata = res;
    })
    var returnedcalories = exercisefetcheddata.exercises[0].nf_calories;
    var returnedtime = exercisefetcheddata.exercises[0].duration_min;
    exercisevaluecalories.innerHTML = returnedcalories
    exercisevaluetime.innerHTML = returnedtime;
    exerciseresults.style.display = "block"
}







