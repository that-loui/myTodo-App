# myTodo || Tasks release 1.0.0

This is the first release of my Tasks app, meant to help users track their tasks.

## Table of contents

- [Overview](#overview)

  - [Functionalities](#functionalities)

- [My process](#my-process)

  - [prerequisites](#prerequisites)
  - [build](#build-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

- [Author](#author)

## Overview

The App is designed to save tasks added by users to help them keep track of what they have to do for the day, week or month. It's a web app that makes use of the users local browser storage to store in tasks, preventing it from clearing on refresh. It also has additional features discussed below

### Functionalities

Users should be able to:

- Add tasks to the app: Users are able to add tasks to the app using the form provided after correctly filling in the task info

- Delete tasks from the app: Users should be able to delete tasks from the UI once they have completed a task.

- Know if they have open tasks or not: An info text below the tasks changes based on if there are tasks in the task box or not.

- Receive alerts for actions performed: A pop alert shows when tasks are successfully added o removed from the UI.

- Get greeting based on the current time of the day: A simple greeting is displayed to let the user have an idea of the time of the day( doesn't actually display the time )

- See the current date: Users are able to view the current date in a minified version.

## My process

### prerequisites

- Created a basic design file
- Added bootstrap using cdn JSdeliver live link.
- Imported the project assets and other relevant components and files.
- Linked all relevant files to the 'index.html' file
- Created classes to house my functions in my ui.js file.
- imported all classes from ui.js into script.js

### build-process

- I divided the task/project into multiple sections sections,

  - [The greet section:](#the-greet-section)
  - [The input section:](#the-input-section)
  - [The display section:](#the-display-section)

#### The greet section:

This section is just the header section, that greats the user based on current time, the greeting on the UI changes based on the time zone.

```js
 static changeGreeting() {
    let today = new Date();
    let hours = today.getHours();
    switch (true) {
      // check hour o fthe day and display text based on that
      case hours > 12 && hours < 16:
        greeting.innerHTML = ` Good Afternoon U+1F33B`;
        break;
      case hours > 16 && hours <= 19:
        greeting.innerHTML = ` Good Evening U+1F307`;
        break;
      case hours > 19 && hours < 24:
        greeting.innerHTML = ` Good Evening &#x1F314`;
        break;
     ...
    }
  }
```

#### The Input section:

This section is basically a form with two input fields and a submit button. It has a simple design with a header that indicates it's the section to add tasks, after the form is submitted it goes through a validation process, if the validation is true the task gets successfully added to the display section

```js
<!-- simple validation method -->
class UI {
  static validateInput(input) {
    if (input != '') {
      return true;
    } else {
      UI.displayAlert('danger', ' One Input is Empty!');
      return false;
    }
  }
}
```

#### The display section:

This is currently the last part of the App, this section mainly displays tasks added from the input section for user to track / see their tasks. When tasks are added, in combination with the task title ad task details value, a checked box and delete button is also added. When the delete button is pressed, the task is removed. (This is done by getting all the values in local storage using the _getFromLocalStorage()_ and removing the specific index from the array, and resetting local storage, so when _addTask()_ is called, it will update the UI with the current tasks in local storage.)

```js
class UI {
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
}
```

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flex Box
- CSS Grid
- Mobile-first workflow
- [Bootstrap](https://getbootstrap.com) - CSS framework

### Continued development

- For the version 1.0.2. The remove checked tasks feature would be added along with the edit saved tasks feature and overall bug fixes.  

- Future updates would contain a time tracker for each task and task grouping. 

### Useful resources

- [ resource 1](https://getbootstrap.com/docs/5.3/components/navbar) - This helped me with side bar navigation.
- [ resource 2]() - This helped me with using local storage.

## Author

- Website - [that-loui](https://github.com/that-loui)
- Twitter - [@LMacjob](https://www.twitter.com/LMacjob)
