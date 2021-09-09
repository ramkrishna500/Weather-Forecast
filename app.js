// only one res.send is possible

const express = require('express');
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    // res.send("Server is working..!!!");
    res.sendFile(__dirname+"/index.html");
})

app.post('/' , (req , res)=>{
    const city=req.body.cityName;
    const key="b280dfaa17a3c7476b700f5be26da109";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+unit;
    https.get(url,function(responce){
    //i can use res /responce or any word above...
    console.log(responce.statusCode);
    responce.on("data",function(data){
        wetherData=JSON.parse(data);
        const tmp=wetherData.main.temp;
        const des=wetherData.weather[0].description;
        const icon=wetherData.weather[0].icon;
        const imgurl= "https://openweathermap.org/img/wn/" +icon+"@2x.png"
        // we can have only one res.send for each js file but we can have many res.send()
        res.write("<h1>temp in "+city+ " is "+tmp+" deg</h1>");
        res.write("<p>Wether description is: "+des+" </p>");
        res.write("<img src="+ imgurl+">");
        res.send();
        console.log(wetherData);
    })

})

})

app.listen(3000,function(){
    console.log('Running...');
})


