const mongoose=require('mongoose');
const listSchema=new mongoose.Schema({
    description:
    {
        type:String,
        required:true
    },
    cat:
    {
        type:String,
        required:true
    },
    date:
    {
        type:String,
        required:true
    }
},{
    timestamps:true
});

const List=mongoose.model("List",listSchema);
module.exports=List;