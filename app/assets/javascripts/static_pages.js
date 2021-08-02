$(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      indexTasks(function (response) {
  
  
      values = response.tasks.map(function(task) {

        return "\
          <div class='col-12 w-100 mb-3 p-3 border rounded align-items-center task d-flex justify-content-between' data-id='" + task.id + "'>" +
            '<div>' + 
              '<input type="checkbox" class="checkbox mr-4 >' + '<span class="description h6">' + task.content + "</span>" + 
            '</div>' +
            '<button class="px-2 py-1 btn btn-delete btn-danger text-right">delete</button>' + "\
          </div>";
      });
        
      
      var addButton = document.querySelector("#btn-add");
      addButton.addEventListener("click", function (e) {
        var taskInput = $(".task-input").val();
        e.preventDefault();
        postTask(taskInput);
  
        
        $('task-input').empty();
      });
  
      $("#tasks").html(values);    
  
      var completeButtons = Array.from(document.querySelectorAll("input.checkbox"));
   
      completeButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          var taskId = e.target.parentElement.parentElement.getAttribute("data-id");
          
          if (!e.target.checked) {
            markActive(taskId);
          } else {
            markComplete(taskId);
          }
        });
      });
      
      var deleteButtons = Array.from(document.querySelectorAll(".btn-danger"));
              
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          var taskId = e.target.parentElement.getAttribute("data-id");
          deleteTask(taskId);
        });

      });
    })}
  });