// declare all dom variables

// display date variables
export const todayDate = document.querySelector('.todayDate');
export const greeting = document.querySelector('.greeting');

// display tasks variables

export const taskStatus = document.querySelector('.taskStatus');

export class TaskObject {
  constructor(taskTitle, taskDetail) {
    this.taskTitle = taskTitle;
    this.taskDetail = taskDetail;
  }
}
// class to work with local storage
export class Store {
  // function to add tasks to local storage
  static addToLocalStorage(task) {
    // instantiate new variable to get tasks from local storage
    let tasks = Store.getFromLocalStorage();
    // add new task to already existing tasks
    tasks.push(task);
    // modify tasks in local storage
    localStorage.setItem('task', JSON.stringify(tasks));
  }
  // function to get tasks from local storage
  static getFromLocalStorage() {
    // instantiate a variable to hold tasks
    let tasks;
    // check if local storage is empty
    if (localStorage.getItem('task') === null) {
      tasks = [];
    } else {
      // if local storage isn't empty set variable to localStorage
      tasks = JSON.parse(localStorage.getItem('task'));
    }
    // return variable
    return tasks;
  }
}
// array of stored tasks for now
// export const storedTask = Store.getFromLocalStorage();

// UI class for UI functions
export class UI {
  // validate input function
  static validateInput(input) {
    if (input != '') {
      return true;
    } else {
      UI.displayAlert('danger', ' One Input is Empty!');
      return false;
    }
  }
  // add task to DOM function
  static addTask() {
    const todoList = document.querySelector('.taskList');
    todoList.innerHTML = '';
    // get tasks from local storage
    const storedTask = Store.getFromLocalStorage();
    // loop and display  tasks
    storedTask.forEach((item) => UI.displayTask(item));
    console.log(storedTask);
    // show messages and update status
    UI.displayAlert('success', 'You have added a new task!');
    UI.updateTaskStatus('YOU HAVE OPEN TASKS', 'danger');
  }

  // display task function
  static displayTask(task) {
    const todoList = document.querySelector('.taskList');
    // add form values to table body element
    todoList.innerHTML += `
    <tr>
    <td> <input type="checkbox" name="check" class="checkbox"></td>
    <td>${task.taskTitle}</td>
    <td>${task.taskDetail}</td>
    <td><button class="btn btn-sm btn-danger deleteBtn">x</button></td>
  </tr>
    `;
  }

  // function to display alert
  static displayAlert(classList, message) {
    let alertElement = document.createElement('div');
    alertElement.textContent = message;
    alertElement.classList = `alert alert-${classList} text-${classList}`;

    let header = document.querySelector('.mainHeader');
    header.appendChild(alertElement);

    // setTimeout to remove element after 2secs
    setTimeout(() => {
      alertElement.remove();
    }, 2000);
  }

  // function to delete task and reDisplay remaining tasks
  static deleteTask(index) {
    const todoList = document.querySelector('.taskList');
    todoList.innerHTML = '';
    // remove task from storage array
    storedTask.splice(index, 1);
    storedTask.forEach((item) => UI.displayTask(item));
    UI.displayAlert('danger', 'You Have Removed A task!');
    // check if there are no tasks left and displays the appropriate task status
    if (todoList.innerHTML == '') {
      UI.updateTaskStatus('NO OPEN TASKS', 'success');
    }
  }

  // remove checked tasks
  static removeCheckedTasks() {}

  // function to update task status
  static updateTaskStatus(message, classList) {
    // update tasks status straight from local storage
    if (Store.getFromLocalStorage.length == 0) {
      taskStatus.innerHTML = `${message} <i class="bi bi-list-check"></i>`;
    } else {
      taskStatus.innerHTML = `${message} <i class="bi bi-list-task"></i>`;
    }
    taskStatus.classList = `taskStatus text-${classList}`;
  }
}


