console.log('client.js has been loaded');

$(document).ready(function () {
    getTasks();

    $('#addButton').on('click',addTask)
    // $("#updateButton").on('click', updateTask)
    $('#to-do').on('click', '#deleteButton', deleteTask);
    $('#to-do').on('click', '#updateButton', updateTask);
    $('#to-do').on('click', '#completeButton', completeTask);
    


});

// get values from the database
function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: displayTasks
    });
}

function displayTasks(tasks){
    console.log('got tasks from serve', tasks);
$('#to-do').empty();
tasks.forEach(function(task){
    var $li = $('<li></li>');
    var $form = $('<form></form>');
$form.append('<input type="text" class="taskInput" value="' + task.task + '"/>');
        // $('#to-do').append('<ul>' + task.task + '</ul>');
    // var $updatebutton= $('<button id="updateButton">Update</button>');
    //     $updatebutton.data('id', task.id);
    //     $form.append($updatebutton);
    var $deletebutton=$('<button id="deleteButton">Delete</button>');
        $deletebutton.data('id', task.id);
        $form.append($deletebutton);
    var $completeButton = $('<button id="completeButton">COMPLETE</button>');
            $completeButton.data('status', task.status);
             $completeButton.data('id', task.id);
            $form.append($completeButton);
        

    $li.append($form);
    $('#to-do').append($li);
    });


}

function addTask(event){
    var newTask = $('#task_input').val();
    event.preventDefault();

    $.ajax({ 

        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            status: false
        },
        success: getTasks
        
    })
}

function updateTask () {
    console.log($(this).data()); // this should log {id: '7'} or whatever the id is
    var taskIdToSave = $(this).data().id;
    console.log( taskIdToSave);
    var newTask = $(this).parent().children('.taskInput').val();

    $.ajax({
        method: 'PUT',
        url: '/tasks/' + taskIdToSave,
        data: {
            task: newTask
        },
        success: getTasks
    })
}

function deleteTask() {
    event.preventDefault(event);
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + $(this).data('id'),
        success: getTasks

    });
}

function completeTask(event){
    event.preventDefault();
    var $button= $(this);
    var $form = $button.closest('form');
    var status = $(this).data('status');
    var data = {};
    console.log(data);
  
    if (status == true){
                data.status = false;
               $(this).parent().parent().css('background-color', 'red');
                $(this).data('status', false);
          }else{
            data.status = true;
           $(this).parent().parent().css('background-color', 'green');
           $(this).data('status', true);
  
             }
    $.ajax({
      url: '/tasks/' + $button.data('id'),
      type: 'PUT',
      data: data,
    //   success: getTasks
    });
  
  }


// function updateTask(event){
//     event.preventDefault();
//     var $button= $(this);
//     var $form = $button.closest('form');
  
//     // var data = $form.serialize();
//     // console.log(data);
  
//     $.ajax({
//       url: '/tasks/' + $button.data('id'),
//       type: 'PUT',
//       data: data,
//       success: getTasks
//     });
  
//   }