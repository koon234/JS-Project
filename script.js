$(document).ready(function() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    $('#taskList').empty();
    tasks.forEach(function(task, index) {
      const listItem = $('<li>')
        .text(task.name)
        .addClass(task.completed ? 'completed' : '')
        .appendTo($('#taskList'));

      const deleteBtn = $('<button>')
        .addClass('delete-btn')
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

  $('#addTaskBtn').click(function() {
    const taskName = $('#taskInput').val().trim();
    if (taskName !== '') {
      tasks.push({ name: taskName, completed: false });
      saveTasks();
      renderTasks();
      $('#taskInput').val('');
    }
  });

  $('#clearAllBtn').click(function() {
    if (confirm('Are you sure you want to clear all tasks?')) {
      tasks.splice(0, tasks.length);
      saveTasks();
      renderTasks();
    }
  });

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  renderTasks();
});
