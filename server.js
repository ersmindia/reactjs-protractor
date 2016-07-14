var express = require('express');
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,"/")));
app.listen(5530,function(){

	console.log("Flux TodoMVC is listing to port 5530");
    console.log("visit http://localhost/5530");
});