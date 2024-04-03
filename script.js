// script.js
$(document).ready(function() {
  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render tasks
  function renderTasks() {
    $('#taskList').empty();
    tasks.forEach(function(task, index) {
      const listItem = $('<li>')
        .text(task.name)
        .addClass(task.completed ? 'completed' : '')
        .appendTo($('#taskList'));

      const deleteBtn = $('<button>')
        .text('❌')
        .click(function() {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        })
        .appendTo(listItem);

      const checkbox = $('<input>')
        .attr('type', 'checkbox')
        .prop('checked', task.completed)
        .change(function() {
          task.completed = $(this).prop('checked');
          saveTasks();
          renderTasks();
        })
        .prependTo(listItem);
    });
  }

  // Add task
  $('#addTaskBtn').click(function() {
    const taskName = $('#taskInput').val().trim();
    if (taskName !== '') {
      tasks.push({ name: taskName, completed: false });
      saveTasks();
      renderTasks();
      $('#taskInput').val('');
    }
  });

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Initial render
  renderTasks();
});
