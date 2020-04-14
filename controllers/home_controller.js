//acquiring the list
const List=require("../models/lists");

//accessing home page
module.exports.home= async function(req,res)
{
    try
    {
        let Lists=await List.find({});
        return res.render("home",{app_list:Lists});
    
    }
    catch(err)
    {
        console.log("error in rendering home ",err);
        return;
    }
    
}

//creating a list
module.exports.createList=async function(req,res)
{
    try
    {
        
        console.log(req.body);
        let date=new Date(req.body["date"]);
        date=date.toDateString();
        let datearr=date.split(" ");
        date=datearr[2]+" "+datearr[1]+" , "+datearr[3];
        let newlist=await List.create({
            description:req.body.descript,
            cat:req.body.category,
            date:date
        });
        if(req.xhr)
        {
            return res.json(200,{
                message:"Added List Successfully!",
                data:{
                    newlist:newlist
                }
            })
        }
        return res.redirect("back");
    }
    catch(err)
    {
        console.log("error in creating list ",err);
        return;
    }
}

//deleting lists
module.exports.deleteList= async function(req,res)
{
    try
    {
        console.log("body ",req.query);
        var id=req.query;
        let delItems=[];
        //finding the no of selected checkboxes
        var count=Object.keys(id).length;
        
        for(let key of Object.keys(id))
        {
            //console.log("key ",key);
            let deletedItem=await List.findByIdAndDelete(key);
            console.log(deletedItem);
            delItems.push(deletedItem);
        }
        console.log(delItems);
        if(req.xhr)
        {
            console.log(delItems);
            return res.json(200,{
                message:"Selected Lists deleted Successfully",
                data:{
                    deletedItems:delItems,
                }
            });
        }
        return res.redirect("back");
    }
    catch(err)
    {
        console.log("error in deleting lists ",err);
        return;
    }
    
}