const express=require('express');
const router=express.Router();
const homeController=require("../controllers/home_controller");

console.log("router loaded");

//getting home ejs file from "controller" folder
router.get("/",homeController.home);
//creating the task list
router.post("/create-list",homeController.createList)


//deleting task from the list
router.get("/delete-tasks",homeController.deleteList)


module.exports=router;