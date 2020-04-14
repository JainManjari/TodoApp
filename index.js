//setting up express
const express=require('express');
//defining port
const port=8000;

//acquiring db 
const db=require("./config/mongoose");

//setting up express
const app=express();




//seeting up view engine
app.set("view engine","ejs");
//setting up "views" folder for ejs files
app.set("views","./views");

//to pass the form data
app.use(express.urlencoded());
//to access the static files such as css,js,images
app.use(express.static("assets"));

//setting up "routes" folder
app.use("/",require("./routes/indexRoutes"));

//setting up the port for app 
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error is found on the server ${err}`);
        return;
    }
    console.log(`Server is working fine on port ${port}`);
});