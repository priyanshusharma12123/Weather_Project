const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
 const query = req.body.cityName;
 const apiKey = "your_api_key"; //Paste your api key in the string which you will get for openweatherapi website :)
 const unit = "metric";

 url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

 https.get(url, function(response){

     console.log(response.statusCode);

     response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const cast = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const url2 = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p style='text-align:center; width:100%; font-size:1.5rem; margin-top:10%;'>The weather today is mostly " + cast + "</p>");
        res.write("<h1 style='text-align:center; width:100%; font-size:3rem;'>The current temperature in " + query + " is " + + temp + " degree Celcius</h1>" );
        res.write("<center><img src=" + url2 + " width='20%' height='30%'/></center>");
        res.send();
       });
  });


 console.log("Post request received.");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});