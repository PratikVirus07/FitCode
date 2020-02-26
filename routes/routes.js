const ObjectId = require('mongodb').ObjectId
const moment = require('moment')

module.exports = function(app, db){

    app.post('/myapis/signup/', (req, res) => {
        console.log("Hey")
        const body = req.body
        if(body){
            const signupcollection = db.collection("SignUpCollection");
            // var mySignupDataObject = {
            //     "Email" : "pspratik07@gmail.com",
            //     "Password" : "Test123",
            //     "Phone NUmmber" : "8585858585"
            // }  
            signupcollection.insertOne(body)
            .then(result => {
                res.status(200).send({
                    status:"success",
                    message:"1 document inserted"
                })
            })
            .catch(error => {
                res.status(400).send({
                    status:"error",
                    message: error
                })
            })
        }
    })



    app.post('/myapis/login/', (req, res) => {
        const body = req.body;
        const myemail =  body.EmailID;
        const mypassword = body.Password;
        let isUserthere = false;
        console.log(myemail) 
        console.log(mypassword) 
        if (body){
            const signupcollection = db.collection("SignUpCollection");
            signupcollection.find({"EmailID" : myemail})
            .toArray()
            .then(data => {
                if(data.length)
                {
                    isUserthere=true;
                    if (isUserthere){
                        if(mypassword == data[0].Password){
                            console.log("User exists and Authentication sucessful... Welcome");
                            res.status(200).send({
                                message : "Welcome",
                                userName:data[0].UserName,
                                isAuthenticated:"password match"
                            })
                            // res.cookie('username', 'john doe', { maxAge: 900000, httpOnly: true });
                        }else{
                          console.log("User exists But Authentication unsucessful... Incorrect Password");
                          res.status(300).send({
                            message : "Wrong Password",
                            isAuthenticated:"password doesnot match"
                            })
                        }
                      }

                }else{
                    res.status(400).send({
                        message:"The User doesnot exist",
                        isAuthenticated:"User doesnot exist"
                    })
                }
            })
        }else{
            res.status(400).send({
                message:"Please enter something",
                // isAuthenticated:"User doesnot exist"
            })  
        }
    })

    app.post('/myapis/postUserDetails/', (req, res) => {
        const body = req.body;
        if (body){
            const userDetailsCollection = db.collection("UserDetailsCollection");
            userDetailsCollection.insertOne(body)
            .then(result => {
                res.status(200).send({
                    message:"Inserted details for one user",
                    data:result
                })
            })
            .catch(error => {
                res.status(400).send({
                    message:"Some error while inserting user details",
                    error:error
                })
            })
        }
    })

    app.get('/myapis/postUserDetails/:userName', (req, res) => {
        var userName = req.params.userName
        if(userName){
            const userDetailsCollection = db.collection("UserDetailsCollection");
            userDetailsCollection.find({UserName:userName})
            .toArray()
            .then(data => {
                res.status(200).send({
                    userData:data
                })
            })
        }
    })

    app.put('/myapis/updateCaloriesFromFood/:userName', async (req, res) => {
        let foodCalories =  req.body.caloriesFood
        
        var username = req.params.userName
        console.log(username)
            const userDetailsCollection = db.collection("UserDetailsCollection");
            const user = await userDetailsCollection.findOne({UserName:username})
            .then(data => {
                return data;
            })
        console.log(foodCalories)
        console.log((user.DesiredCalories))
        console.log(moment().isSame(user.calorieslastupdated, "d"))
        const remainingcalories = (moment().isSame(user.calorieslastupdated, "d"))
                                 ? parseFloat(user.remainingcalories) - parseFloat(foodCalories) 
                                 :  parseFloat(user.DesiredCalories) - parseFloat(foodCalories);
        console.log(remainingcalories);

        const result = await userDetailsCollection.updateOne({UserName:username}, {
            $set: {
                "remainingcalories": Math.round(remainingcalories * 100) / 100,
                "calorieslastupdated": new Date()
            },
        })
        .then(data => {
           return data;
        })
        res.status(200).send({
            remaningCalories:remainingcalories
        })
    })

    app.put('/myapis/updateCaloriesFromExercise/:userName', async (req, res) => {
        let exerciseCalories =  req.body.caloriesExercises
        
        var username = req.params.userName
        // console.log(username)
            const userDetailsCollection = db.collection("UserDetailsCollection");
            const user = await userDetailsCollection.findOne({UserName:username})
            .then(data => {
                return data;
            })
        // console.log(exerciseCalories)
        // console.log((user.DesiredCalories))
        const remainingcalories = (moment().isSame(user.calorieslastupdated, "d")) 
                                    ? user.remainingcalories + exerciseCalories 
                                    :  parseFloat(user.DesiredCalories) + parseFloat(exerciseCalories);
        // console.log(remainingcalories);

        const result = await userDetailsCollection.updateOne({UserName:username}, {
            $set: {
                "remainingcalories": remainingcalories,
                "calorieslastupdated": new Date()
            },
        })
        .then(data => {
           return data;
        })
        res.status(200).send({
            remaningCalories:remainingcalories
        })
    })

    app.get('/myapis/fetchExercises/:goalName', (req, res) => {
        var goalName = req.params.goalName
        if(goalName){
            const userExerciseCollection = db.collection("ExerciseCollection");
            userExerciseCollection.find({GoalName:goalName})
            .toArray()
            .then(data => {
                res.status(200).send({
                    userData:data
                })
            })
        }
    })

}










