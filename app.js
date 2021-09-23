var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose");
const { append } = require("vary");

const index = express()
index.use(bodyparser.json())
index.use(express.static('public'))
index.use(bodyparser.urlencoded({
   extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("connected to Database"))


index.post("/register", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var mobilenumber = req.body.mobilenumber;

    var data = {
        "name": name,
        "email": email,
        "password": password,
        "mobilenumber": mobilenumber


    }
    db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    })
})

index.get("/", (req, res) => {
    res.set({
        "ALLOW-access-Allow-Origin": '*'
    })

}).listen(1000);

console.log("listening on port 1000");