// declare all dom variables

// form variables

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
// array of stored tasks for now
export const storedTask = [];

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
  // add task function
  static addTask(task) {
    const todoList = document.querySelector('.taskList');
    todoList.innerHTML = '';
    storedTask.push(task);
    storedTask.forEach((item) => UI.displayTask(item));
    console.log(storedTask);
    UI.displayAlert('success', 'You have added a new task!');
    UI.updateTaskStatus('YOU HAVE OPEN TASKS','danger');
  }

  // display task function
  static displayTask(task) {
    const todoList = document.querySelector('.taskList');

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
    UI.updateTaskStatus('NO OPEN TASKS', 'success');
  }
  // function to update task status
  static updateTaskStatus(message, classList) {
    if (storedTask.length == 0) {
      taskStatus.innerHTML = `${message} <i class="bi bi-list-check"></i>`;
      
    } else {
      taskStatus.innerHTML = `${message} <i class="bi bi-list-task"></i>`;
    }
    taskStatus.classList = (`taskStatus text-${classList}`)
  }
}
