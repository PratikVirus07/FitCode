var male = document.getElementById("male");
var female = document.getElementById("female");
var username = document.getElementById("username")
var fullname = document.getElementById("fullname");
var height =document.getElementById("height");
var weight = document.getElementById("weight");
var age = document.getElementById("age");
var activitylevel = document.getElementById("activitylevel");
var goalselection = document.getElementById("goalselection");
var musclegainbutton = document.getElementById("musclegainbutton");
var musclebuildingmodalinputusername = document.getElementById("musclebuildingmodalinputusername");
var newUserCard = document.getElementById("newUserCard");
var existingUserCard = document.getElementById("existingUserCard");
const cookieUserName = document.cookie;
// console.log('Cookies: ', req.cookies)
console.log(cookieUserName);

// var loginURL = "http://127.0.0.1:1234/myapis/";
var loginURL = "https://evening-harbor-00200.herokuapp.com/myapis/"

checkIfExistingUser()

async function checkIfExistingUser(){
    var userdata;
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
    if(userdata.length){
        newUserCard.style.display = "none";
        existingUserCard.style.display = "block"
    }else{
        newUserCard.style.display = "block";
        existingUserCard.style.display = "none"
    }
}

function calculateCalories(){
    if (male.checked)
    {
        resultBMI = 66.5 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    }
    if (female.checked)
    {
        resultBMI = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    }
    var result = resultBMI * activitylevel.value;
     return (Math.round( result * 10) / 10);
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
    return (Math.round( myProtienValue * 10) / 10);
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
    return  (Math.round( myCarbsValue * 10) / 10);
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
    return (Math.round( myFatValue * 10) / 10);
}




async function addUserDetailsToDatabase(){

    var dbHeight = height.value;
    var dbWeight = weight.value;
    var dbAge = age.value;
    var dbActivityLevel = activitylevel.value;
    var dbgoalselection = goalselection.value;

    if (male.checked){
        var gender = "Male";
    }else if (female.checked){
        var gender = "female";
    }

    var maintainancecalories = await calculateCalories();
    var desiredcalories = maintainancecalories*(goalselection.value);
    desiredcalories = Math.round( desiredcalories * 10) / 10;
    var proteinReqd = await proteincalculate(desiredcalories);
    var carbsReqd = await carbscalculate(desiredcalories);
    var fatReqd = await fatcalculate(desiredcalories);
    

    height.value = "";
    weight.value ="";
    age.value ="";
    activitylevel.value =""; 
    goalselection.value = "";
    male.checked = false;
    female.checked = false;

    let userDBdetails = JSON.stringify({
        "UserName":cookieUserName,
        "Height":dbHeight,
        "Weight":dbWeight,
        "Age":dbAge,
        "Gender":gender,
        "ActivityLevel":dbActivityLevel,
        "Goals":dbgoalselection,
        "MaintainanceCalories":maintainancecalories,
        "DesiredCalories":desiredcalories,
        "DesiredProtein":proteinReqd,
        "DesiredCarbs":carbsReqd,
        "DesiredFat":fatReqd,
        "remainingcalories":desiredcalories,
        "calorieslastupdated": new Date()
    })
    await fetch (loginURL+"postUserDetails", {
        method:"POST",
        body:userDBdetails,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>{
        //document.getElementById("givedetailsmodal").style.display = "none"
        res.json();
        newUserCard.style.display = "none";
        existingUserCard.style.display = "block"
        
    })
    // document.cookie = userDBdetails + ";path=/";
}











