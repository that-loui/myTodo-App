import { TaskObject, UI, Store } from './ui.js';
const taskForm = document.querySelector('.taskForm');
const todoList = document.querySelector('.taskList');

document.addEventListener('DOMContentLoaded', () => {
  // const storedTask = Store.getFromLocalStorage();
  // storedTask.forEach((task) => {
  //   UI.addTask(task);
  // });
  UI.addTask()
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = document.querySelector('#taskTitle').value;
  const taskDetails = document.querySelector('#taskDetail').value;

  if (UI.validateInput(taskTitle) && UI.validateInput(taskDetails)) {
    console.log('success');
    let newTask = new TaskObject(taskTitle, taskDetails);
    Store.addToLocalStorage(newTask);
    UI.addTask();
  } else {
    console.log('invalid');
  }

  taskForm.reset();
});

// delete task
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    let index = e.target.parentElement.parentElement.rowIndex - 1;
    UI.deleteTask(index);
  }
});
