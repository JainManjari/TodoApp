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
                    if(checkboxs.length==0)
                    {
                        console.log("adding for first time");
                        let newForm=newDOMForm();
                        $("body .container").append(newForm);
                    }

                    $(".outside-list").append(newlist);
                    checkboxs=$(".outside-list li input");
                    taskNames=$(".task-details span");
                    taskDates=$(".task-details p");
                    swal({
                        title: "Added Successfully!",
                        text: "The new task is added!",
                        icon: "success",
                    });
                    checkFunc(checkboxs,taskNames,taskDates);
                   
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

    let newDOMForm=function()
    {
        return $(`
        
        <form action="/delete-tasks" method="get" id="delete-lists-form">
                
        <h1 class="heading center taskhead">
            Pending Tasks
        </h1>


    <ul class="outside-list">

    </ul>

    <div class="btns">
        <button type="button" class="bck-color-red btns" id="delete-task" data-toggle="modal" data-target="#exampleModal">
            <div>
                <i class="fas fa-trash-alt"></i>
            </div>
            Delete Task
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header center">
                <h5 class="modal-title center" id="exampleModalLabel">Are you sure you want to delete?</h5>
                </div>
                <div class="modal-body">
                Once deleted, tasks can't be recovered!
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-danger">Delete</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</form>

        `);
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
                    let delItems=data.data.deletedItems;
                    console.log("deleting ",delItems.length);
                    $("#exampleModal").removeClass("show");
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    if(delItems.length==1)
                    {
                        console.log("no form now");
                        $("#delete-lists-form").remove();
                    }
                    else
                    {
                        delItems.forEach(function(item)
                        {
                            $(`#list-${item}`).remove();
                        });
                    }
                },
                error:function(err)
                {
                    console.log("error in deleting task using ajax ",err);
                }
            })
        });
        
    }
    deleteLists();
    
    
    let checkFunc=function(checkboxs,taskNames,taskDates)
    {
        for( let i=0;i<checkboxs.length;i++)
        {
            checkboxs[i].addEventListener("click",function()
            {
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
    }
    
    checkFunc(checkboxs,taskNames,taskDates);
    






