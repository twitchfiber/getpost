var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({defaultLayout:'main'});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 5560);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

http.createServer(function(req,res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
  }).listen(5560);

app.use(function(req, res) {
    res.type("text/plain")
    if (req.method === "GET" && req.route === "/") {
        // you just submitted a get request!
        var arr = [];
        for (var p in req.query) {
            arr.push({"key": p, "val": req.query[p]}) 
        }
        var obj = {};
        obj.args = arr;
        res.render("get", obj);
    }
    else if (req.method === "POST" && req.route === "/") 
    {
        // you just submitted a  request!
        var arr = [];
        for (var p in req.body) {
            arr.push({"key": p, "val": req.body[p]}) 
        }
        var obj = {};
        obj.args = arr;
        res.render("post", obj);
    }
});

app.listen(app.get("port"), function() {
    console.log("Express started on " + app.get("port"));
});











