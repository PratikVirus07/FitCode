var male = document.getElementById("male");
var female = document.getElementById("female");
var username = document.getElementById("username")
var fullname = document.getElementById("fullname");
var height =document.getElementById("height");
var weight = document.getElementById("weight");
var age = document.getElementById("age");
var activitylevel = document.getElementById("activitylevel");
var musclegainbutton = document.getElementById("musclegainbutton");
var musclebuildingmodalinputusername = document.getElementById("musclebuildingmodalinputusername");
const cookieUserName = document.cookie;
console.log("content " , cookieUserName);

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
     return result;
}

// var loginURL = "http://127.0.0.1:1234/myapis/";
var loginURL = "https://evening-harbor-00200.herokuapp.com/myapis/"

async function addUserDetailsToDatabase(){

    var dbUserName = username.value;
    var dbName = fullname.value;
    var dbHeight = height.value;
    var dbWeight = weight.value;
    var dbAge = age.value;
    var dbActivityLevel = activitylevel.value;

    if (male.checked){
        var gender = "Male";
    }else if (female.checked){
        var gender = "female";
    }

    var maintainancecalories = calculateCalories();

    username.value = ""; 
    fullname.value = "";
    height.value = "";
    weight.value ="";
    age.value ="";
    activitylevel.value =""; 
    male.checked = false;
    female.checked = false;

    let userDBdetails = JSON.stringify({
        "UserName":dbUserName,
        "Name":dbName,
        "Height":dbHeight,
        "Weight":dbWeight,
        "Age":dbAge,
        "Gender":gender,
        "ActivityLevel":dbActivityLevel,
        "MaintainanceCalories":maintainancecalories
    })
    await fetch (loginURL+"postUserDetails", {
        method:"POST",
        body:userDBdetails,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
}











