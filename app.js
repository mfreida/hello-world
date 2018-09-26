var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/local");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/manifest", (req, res) => {
    res.sendFile(__dirname + "/manifest.json");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Successfully saved the name to the database! Great job :) ");
        })
        .catch(err => {
            res.status(400).send("Oops, :( wasn't able to save that in the database");
        });
});


app.listen(port, () => {
    console.log("The server is running and listening on port :  " + port);
});