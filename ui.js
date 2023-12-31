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
    UI.updateTaskStatus();
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
    // get tasks from local storage
    const storedTask = Store.getFromLocalStorage();
    // remove task from local storage array
    storedTask.splice(index, 1);
    // display danger alert
    UI.displayAlert('danger', 'You Have Removed A task!');
    // add task back to local storage
    localStorage.setItem('task', JSON.stringify(storedTask));
    // Update UI with current tasks
    UI.addTask();
    // check if there are no tasks left and displays the appropriate task status
    if (todoList.innerHTML == '') {
      UI.updateTaskStatus();
    }
  }

  // remove checked tasks
  static removeCheckedTasks() {}

  // function to update task status
  static updateTaskStatus() {
    // update tasks status straight from local storage
    if (Store.getFromLocalStorage().length == 0) {
      taskStatus.innerHTML = `${'NO OPEN TASKS'} <i class="bi bi-list-check"></i>`;
      // update alert to match status
      taskStatus.classList = `taskStatus text-success`;
    } else {
      taskStatus.innerHTML = `${'YOU HAVE OPEN TASKS'} <i class="bi bi-list-task"></i>`;
      // update classlist to match status
      taskStatus.classList = `taskStatus text-danger`;
    }
  }

  static displayDates() {
    let today = new Date();
    // console.log();
    todayDate.textContent = today.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  static changeGreeting() {
    let today = new Date();
    let hours = today.getHours();
    switch (true) {
      // check hour of the day and display text based on that
      case hours >= 12 && hours <= 16:
        greeting.innerHTML = ` Good Afternoon 🌞`;
        break;
      case hours > 16 && hours <= 19:
        greeting.innerHTML = ` Good Evening  🌇 `;
        break;
      case hours > 19 && hours < 24:
        greeting.innerHTML = ` Good Evening 🌙 `;
        break;
      case hours > 0 && hours < 6:
        greeting.innerHTML = ` Hello ,You should be sleeping  🌚`;
        break;
      default:
        greeting.innerHTML = ` Good Morning 🌅 `;
        break;
    }
  }
}
