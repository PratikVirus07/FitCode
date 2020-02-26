var foodid = document.getElementById("foodid");
var exerciseid = document.getElementById("exerciseid");

var maintenanceCalorie = document.getElementById("maintenanceCalorie");
var desiredCalorie = document.getElementById("desiredCalorie");
var desiredProtien = document.getElementById("desiredProtien");
var desiredCarbs = document.getElementById("desiredCarbs");
var desiredFat = document.getElementById("desiredFat");
var desiredCalories = document.getElementById("desiredCalories");
var desiredGoal = document.getElementById("desiredGoal");
var userHeight;
var userWeight;
var userGender;
var userAge;
var myFoodCalorie;
var myExerciseCalorie;
var remaningCalories = document.getElementById("remaningCalories")

var foodCalorie = document.getElementById("foodCalorie");
var foodProtien = document.getElementById("foodProtien");
var foodCarbs = document.getElementById("foodCarbs");
var foodFat = document.getElementById("foodFat");
var foodQuantity = document.getElementById("foodQuantity");
var foodUnit = document.getElementById("foodUnit");

var exerciseName = document.getElementById("exerciseName");
var exerciseTime = document.getElementById("exerciseTime");
var exerciseCalorieBurn = document.getElementById("exerciseCalorieBurn");

var userGoal;
var todayDayName;
var welcomeName = document.getElementById("welcomeName");

var totalDailyCalories = document.getElementById("totalDailyCalories");

var goalInExerciseHeading = document.getElementById("goalInExerciseHeading");
var dateInExerciseHeading = document.getElementById("dateInExerciseHeading");
var dayInExerciseHeading = document.getElementById("dayInExerciseHeading");
var exerciseTableBody = document.getElementById("exerciseTableBody");
var myFoodTable = document.getElementById("myFoodTable");
var myExerciseTable = document.getElementById("myExerciseTable")

 const cookieUserName = document.cookie;
 console.log(cookieUserName);

//  var loginURL = "http://127.0.0.1:1234/myapis/"
 var loginURL = "https://evening-harbor-00200.herokuapp.com/myapis/"

function getDayName(){
    var d = new Date();
    var n = d.getDay();
    if(n==0){
        todayDayName = "Sunday"
    }else if(n==1){
        todayDayName = "Monday"
    }else if(n==2){
        todayDayName = "Tuesday"
    }
    else if(n==3){
        todayDayName = "Wednesday"
    }
    else if(n==4){
        todayDayName = "Thursday"
    }
    else if(n==5){
        todayDayName = "Friday"
    }
    else if(n==6){
        todayDayName = "Saturday"
    }
}

function getTodayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

async function getUserNutrients () {

   await getDayName();

    var userName = cookieUserName;
    welcomeName.innerText = userName.toUpperCase()
    var userdata;
    var userExercises;
    let res = await fetch(loginURL + "postUserDetails/"+cookieUserName , {
        method:"GET",
        params:cookieUserName,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        let data = res.json();
        console.log(data)
        return data
    }).then(res => {
        userdata = res.userData;
        console.log(userdata)
    })
    var userMaintenanceCalories = userdata[0].MaintainanceCalories
    var userDesiredCalories = userdata[0].DesiredCalories
    var userDesiredProtien = userdata[0].DesiredProtein
    var userDesiredCarbs = userdata[0].DesiredCarbs
    var userDesiredFats = userdata[0].DesiredFat
    var goals = userdata[0].Goals
    var userRemaningCalories = userdata[0].remainingcalories
    userWeight=userdata[0].Weight;
    userHeight=userdata[0].Height;
    userAge=userdata[0].Age;
    userGender=userdata[0].Gender;

    maintenanceCalorie.innerText = userMaintenanceCalories
    desiredCalorie.innerText = userDesiredCalories
    desiredProtien.innerText = userDesiredProtien
    desiredCarbs.innerText = userDesiredCarbs
    desiredFat.innerText = userDesiredFats
    desiredCalories.innerText = userDesiredCalories
    totalDailyCalories.innerText = userDesiredCalories

    if(userRemaningCalories == undefined){
        remaningCalories.innerText = userDesiredCalories
    }else{
        remaningCalories.innerText = userRemaningCalories
    }

    if(goals == 1.2){
        desiredGoal.innerText = "Build Muscle"
        goalInExerciseHeading.innerText = "Build Muscle"
        userGoal = "MuscleBuilding"
    } else if (goals == 0.8){
        desiredGoal.innerText = "Fat Loss"
        goalInExerciseHeading.innerText = "Fat Loss"
        userGoal = "FatLoss"
    } else if (goals == 1.4){
        desiredGoal.innerText = "Get Stronger"
        goalInExerciseHeading.innerText = "Get Stronger"
        userGoal = "GetStronger"
    } else if (goals == 1){
        desiredGoal.innerText = "Be Fit"
        goalInExerciseHeading.innerText = "Be Fit"
        userGoal = "BeFit"
    } else if (goals == 1){
        desiredGoal.innerText = "Increase Endurance"
        goalInExerciseHeading.innerText = "Increase Endurance"
        userGoal = "Endurance"
    } else if (goals == 0.9){
        desiredGoal.innerText = "Condition your body"
        goalInExerciseHeading.innerText = "Condition your body"
        userGoal = "Conditioning"
    }

    let response = await fetch(loginURL + "fetchExercises/"+userGoal , {
        method:"GET",
        params:userGoal,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        let data = response.json();
        console.log(data)
        return data
    }).then(response => {
        userExercises = response.userData;
        if(todayDayName == "Sunday"){
            var tableData = document.createElement("td")
            tableData.innerText = "No Exercise Today! Take Rest"
            var tableRow = document.createElement("tr")
            tableRow.appendChild(tableData)
            exerciseTableBody.append(tableRow)
        }else{
                let arrayOfExercises = userExercises[0][todayDayName]
                arrayOfExercises.forEach(element => {
                var tableData = document.createElement("td")
                tableData.innerText = element
                console.log(tableData)
                var tableRow = document.createElement("tr")
                tableRow.appendChild(tableData)
                console.log(tableRow)
                exerciseTableBody.append(tableRow)
            });
        }
    })

    let todaysDate = await getTodayDate()
    dateInExerciseHeading.innerText = "(" + todaysDate + ")"
    dayInExerciseHeading.innerText = todayDayName

    myFoodTable.style.display="none"
    myExerciseTable.style.display="none"

}

getUserNutrients()

async function updateCaloriefromFood (){
    console.log(myFoodCalorie)
    if (myFoodCalorie){
        let myfoodcaloriebody = JSON.stringify({
            "caloriesFood":myFoodCalorie
        })
        // let myUserName = JSON.stringify({
        //     "username":cookieUserName
        // })

        let res = await fetch(loginURL + "updateCaloriesFromFood/"+cookieUserName, {
            method:"PUT",
            body:myfoodcaloriebody,
            params:cookieUserName,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => {
            let data = res.json();
            return data;
        }).then(res => {
            remaningCalories.innerText = res.remaningCalories
        })
    }
}

async function updateCaloriefromExercises (){
    console.log(myExerciseCalorie)
    if (myExerciseCalorie){
        let myExerciseCaloriebody = JSON.stringify({
            "caloriesExercises":myExerciseCalorie
        })
        let res = await fetch(loginURL + "updateCaloriesFromExercise/"+cookieUserName, {
            method:"PUT",
            body:myExerciseCaloriebody,
            params:cookieUserName,
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => {
            let data = res.json();
            return data;
        }).then(res => {
            remaningCalories.innerText = res.remaningCalories
        })
    }
}

async function foodsearchbuttonidclicked(){
    //console.log("hey")
    var foodvalue = foodid.value;
    console.log(foodvalue)
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
             //console.log(data);
            return data;
        }).then(res => {
             fetchedData = res;
            console.log(fetchedData.foods[0])
        })
        myFoodTable.style.display="block"
        foodCalorie.innerText = fetchedData.foods[0].nf_calories;
        myFoodCalorie = fetchedData.foods[0].nf_calories;
        foodProtien.innerText = fetchedData.foods[0].nf_protein;
        foodQuantity.innerText = fetchedData.foods[0].serving_qty;
        foodCarbs.innerText = fetchedData.foods[0].nf_total_carbohydrate;
        foodFat.innerText = fetchedData.foods[0].nf_total_fat;
        foodUnit.innerText = fetchedData.foods[0].serving_unit
    }
}


async function exercisebuttonclicked(){
    var exerciseidvalue = exerciseid.value;
    var ageidvalue = userAge;
    var genderidvalue = userGender;
    var heightidvalue = userHeight;
    var weightidvalue = userWeight;
    var exercisefetcheddata;
    let myexercisequery = JSON.stringify({
        "query":exerciseidvalue,
        "gender":genderidvalue,
        "weight_kg":weightidvalue,
        "height_cm":heightidvalue,
        "age":ageidvalue
       })
       console.log(myexercisequery)

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
    console.log(exercisefetcheddata)
    myExerciseTable.style.display="block"
    exerciseName.innerText= exercisefetcheddata.exercises[0].user_input
    exerciseTime.innerText= exercisefetcheddata.exercises[0].duration_min
    exerciseCalorieBurn.innerText= exercisefetcheddata.exercises[0].nf_calories
    myExerciseCalorie = exercisefetcheddata.exercises[0].nf_calories
}







