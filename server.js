var express = require('express');
var path = require("path");

var app = express();
console.log(app);
app.use(express.static(path.join(__dirname,"/")));
app.listen(8000,function(){

	console.log("School is listing to port 8000");
});