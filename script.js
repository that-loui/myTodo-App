import { TaskObject, UI, Store} from './ui.js';
const taskForm = document.querySelector('.taskForm');
const todoList = document.querySelector('.taskList');

document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = Store.getTasksFromStorage();
  storedTasks.forEach(task => UI.addTask(task));
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = document.querySelector('#taskTitle').value;
  const taskDetails = document.querySelector('#taskDetail').value;

  if (UI.validateInput(taskTitle) && UI.validateInput(taskDetails)) {
    console.log('success');
    // instantiate new task
    let newTask = new TaskObject(taskTitle, taskDetails);
    // add task to local storage
    Store.addToLocalStorage(newTask);
    //  add task to ui
    UI.addTask(newTask);
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

console.log(Store.getTasksFromStorage());