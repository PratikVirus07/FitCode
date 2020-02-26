const express =  require("express");
const app = express();
var cookieParser = require('cookie-parser')
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const routes = require('./routes/routes.js');
const port = process.env.PORT || 1234;




const db_uri = "mongodb+srv://pratik123:test123@cluster0-5ymnd.mongodb.net/test?retryWrites=true&w=majority";

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});


mongoclient.connect(db_uri, (error, db_client) => {
    if(error){
        console.log("Error while connecting to database");
        throw error;
    }
    console.log("Connection Sucessful with MongoDB");
    const fitcodeDB = db_client.db("FitCodeDatabase");
    //console.log(fitcodeDB)
    routes(app, fitcodeDB);

    app.listen(port, ()=>{
        console.log("Server started and working");
    })
})

