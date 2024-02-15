const { log } = require("console");
const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
 
})

app.post("/",function(req,res){
   
    
    const query=req.body.CityName
    const apiKey="1d8f401dd725f5df716d3d513476726a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response);

        response.on("data",function(data){
            weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const feelLike=weatherData.main.feels_like;
            const weatherDesp=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>the temperature od "+query+" is"+temp+ " degrees and feels like "+feelLike+"</h1>")
            res.write("<h2>The weather is currently "+weatherDesp+"</h2>");
            res.write("<img src="+imageUrl+">");
            res.send()
        })
    })
})




app.listen(3000,function(){
    console.log("Server running on port 3000");
})