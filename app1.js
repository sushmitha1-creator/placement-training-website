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

mongoose.connect('mongodb://localhost:27017/feedbackdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("connected to Database"))


index.post("/register", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "message": message


    }
    db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Thank You");
    })
})

index.get("/", (req, res) => {
    res.set({
        "ALLOW-access-Allow-Origin": '*'
    })

}).listen(3000);

console.log("listening on port 3000");