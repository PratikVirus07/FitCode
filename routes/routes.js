const ObjectId = require('mongodb').ObjectId

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

}










