var des=$(".txtarea");
var dropmenuButton=$(".drop-menu")
var desbutton=$(".descript");
var category=$(".category");
var calender=$(".calender");
var addTask=$("#add-task")
var dateButton=$("#due-date");

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

var checkboxs=$(".outside-list li input");
var taskNames=$(".task-details span");
var taskDates=$(".task-details p");


for( let i=0;i<checkboxs.length;i++)
{
    checkboxs[i].addEventListener("click",function()
    {
        //console.log(checkboxs[i],i,checkboxs.length);
        if(checkboxs[i].checked)
        {
            //checkboxs[i].style.backgroundColor="#169F5D";
            taskNames[i].classList.add("lineThrough");
            taskDates[i].classList.add("lineThrough");
        }
        else
        {
            //checkboxs[i].style.backgroundColor="white";
            taskNames[i].classList.remove("lineThrough");
            taskDates[i].classList.remove("lineThrough");
        }
    })
}

function linethrough(lists)
{
    

     for( let list of lists)
     {
        console.log(list);
        let check=$(" input",list);
        let taskName=$(" .task-details span",list);
        let taskDate=$(" .task-details p",list);
        checkboxs.push(check);
        taskNames.push(taskName);
        taskDates.push(taskDate);
        
        // check.on("click",function()
        // {
        //     console.log(check,taskName,taskDate);
        //     if(check.checked)
        //     {
        //         //checkboxs[i].style.backgroundColor="#169F5D";
        //         taskName.css("text-decoration","line-through");
        //         taskDate.css("text-decoration","line-through");
        //     }
        //     else
        //     {
        //         //checkboxs[i].style.backgroundColor="white";
        //         taskName.css("text-decoration","none");
        //         taskDate.css("text-decoration","none");
        //     }
        // });
    }
}

$(document).ready(function()
{
    $("#due-date").attr("min",todayDate());
})

function todayDate()
{
    var today=new Date();
    var dd=today.getDate();
    var mm=today.getMonth()+1;
    var yyyy=today.getFullYear();

    if(dd<10)
    {
        dd="0"+dd;
    }

    if(mm<10)
    {
        mm="0"+mm;
    }
    return mm+"-"+dd+"-"+yyyy;
}


    
    let createList=function(){      
        let listform=$(`#new-list-form`);
        listform.submit(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:"post",
                url:"/create-list",
                data:listform.serialize(),
                success:function(data)
                {
                    let newlist=newDOMList(data.data.newlist);
                    $(".outside-list").append(newlist);
                    linethrough($(".outside-list li"));
                    console.log(checkboxs,taskNames,taskDates);
                    swal({
                        title: "Added Successfully!",
                        text: "The new task is added!",
                        icon: "success",
                    });
                },
                error:function(err)
                {
                    console.log("error in creating a list using ajax ",err);
                }

            })
        })
    }
    createList();
    let newDOMList=function(list)
    {
        return $(`<li id="list-${list._id}">

        <input type="checkbox" name="${list._id}">

        <div class="task-details">
            <span> ${list.description } </span>
            <p> ${list.date } </p>
        </div>

        <div class="category-list bck-color-${list.cat }">
            <div style="margin-top: 8px;"> ${list.cat }</div>
        </div>

    </li>`)
    }

    let deleteLists=function()
    {
        let deleteListForm=$("#delete-lists-form");
        deleteListForm.submit(function(e)
        {
            e.preventDefault();
            $.ajax({
                type:"get",
                url:"/delete-tasks",
                data:deleteListForm.serialize(),
                success:function(data)
                {
                    swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover these tasks!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            let delItems=data.data.deletedItems;
                            delItems.forEach(function(item)
                            {
                                $(`#list-${item._id}`).remove();
                            });
                          swal("Your tasks has been deleted!", {
                            icon: "success",
                          });
                        } else {
                          swal("Your tasks are safe!");
                        }
                      });
                },
                error:function(err)
                {
                    console.log("error in deleting task using ajax ",err);
                }
            })
        });
        
    }
    deleteLists();
    
    







