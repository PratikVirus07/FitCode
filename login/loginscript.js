var login = document.getElementById("login");
var register = document.getElementById("register");
var btn = document.getElementById("btn");
var signupusername = document.getElementById("signupusername");
var signupemailid = document.getElementById("signupemailid");
var signuppassword = document.getElementById("signuppassword");
var loginemailid = document.getElementById("loginemailid");
var loginpassword = document.getElementById("loginpassword");
var wrongpasswordclass = document.getElementById("wrongpasswordclass")
var userdoesnotexistclass = document.getElementById("userdoesnotexistclass")

function registerfunction(){
    login.style.left = "-400px";
    register.style.left = "50px";
    btn.style.left = "110px";
}

function loginfunction(){
    login.style.left = "50px";
    register.style.left = "450px";
    btn.style.left = "0px";
}

// var loginURL = "http://127.0.0.1:1234/myapis/"
var loginURL = "https://evening-harbor-00200.herokuapp.com/myapis/"

async function addLoginDetailsToDatabase(){
    wrongpasswordclass.style.display = "none";
    userdoesnotexistclass.style.display = "none";
    console.log("Signingup")
    var dbusername = signupusername.value;
    var dbemailid = signupemailid.value;
    var dbpassword = signuppassword.value;
    register.reset();
    // signupusername.value="";
    // signupemailid.value="";
    // signuppassword.value="";
    let signupdetails = JSON.stringify({
        "UserName" : dbusername,
        "EmailID" : dbemailid,
        "Password" : dbpassword
    });
    console.log(signupdetails);
    await fetch(loginURL+"signup/", {
        method:"POST",
        body:signupdetails,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
    //console.log(res);
}

async function checkIfUserExist(){
    wrongpasswordclass.style.display = "none";
            userdoesnotexistclass.style.display = "none";
    var myloginemailid = loginemailid.value;
    var myloginpassword = loginpassword.value;
    console.log(myloginemailid + " " + myloginpassword)
    let loginbody = JSON.stringify({
        "EmailID":myloginemailid,
        "Password":myloginpassword
    })
    //console.log(loginbody)
     let res = await fetch(loginURL+"login/", {
        method:"POST",
        body:loginbody,
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        console.log(res)
        let data= res.json();
        console.log(data);
        return data;
        //console.log("1st promise")
        // /window.location ="success.html";
    }).then(res =>{
        let data= res;
        //console.log(data)
        console.log(data.isAuthenticated);
        // console.log("2nd promise")
        var userName = data.userName
        if (data.isAuthenticated === "password match"){
            welcomeAfterAunthentication(userName);
        }
        else if (data.isAuthenticated == "password doesnot match"){
            wrongpasswordclass.style.display = "block";
            userdoesnotexistclass.style.display = "none";
        }
        else if (data.isAuthenticated == "User doesnot exist"){
            userdoesnotexistclass.style.display = "block";
            wrongpasswordclass.style.display = "none";
        }

    })   
}
// check how we can do this for individual user
function welcomeAfterAunthentication(userName){
    window.location ="../Content/index.html"
}






