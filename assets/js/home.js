$(function() { 
    $( "#my_date_picker" ).datepicker({ 
        dateFormat: 'dd-mm-yy'
    }); 
});

var des=$(".txtarea");
var dropmenuButton=$(".drop-menu")
var desbutton=$(".descript");
var category=$(".category");
var calender=$(".calender");
var dateButton=$("#my_date_picker");
var addTask=$("#add-task")


desbutton.on("click",function()
{
    des.addClass("bck-color-light");
    category.removeClass("bck-color-light");
    calender.removeClass("bck-color-light");
})

dropmenuButton.on("click",function()
{
    category.addClass("bck-color-light");
    des.removeClass("bck-color-light");
    calender.removeClass("bck-color-light");
})

dateButton.on("click",function()
{
    category.removeClass("bck-color-light");
    des.removeClass("bck-color-light");
    calender.addClass("bck-color-light");
})

addTask.on("click",function()
{
    category.removeClass("bck-color-light");
    des.removeClass("bck-color-light");
    calender.removeClass("bck-color-light");
})



