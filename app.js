const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");
const {
    dirname
} = require("path");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "7dc00075ea0d317f84554d1d22c204df";
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {


        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            const A = "<h2> The weather currently is " + weatherDesc + "</h2>";
            const B = "<h1> The temprature in " + query + " is " + temp + " degree Celsius</h1>";
            const C = "<img src = " + imageURL + ">";

            res.send(A + B + C);
        })
    })

})












app.listen(3000, function () {
    console.log("Server in on port 3000");
})