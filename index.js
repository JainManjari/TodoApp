const express=require('express');
const port=8000;
const app=express();

app.set("view engine","ejs");
app.set("views","./views");

app.use("/",require("./routes/indexRoutes"));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error is found on the server ${err}`);
        return;
    }
    console.log(`Server is working fine on port ${port}`);
});