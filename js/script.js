const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
let todoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  todoData.forEach(function (item) {
    if (item.text == "") {
      return;
    }
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      todoData.pop(item);
      render();
    });
  });

  localStorage.todo = JSON.stringify(todoData);
};

todoControl.addEventListener("submit", function (e) {
  e.preventDefault();
  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  todoData.push(newToDo);
  headerInput.value = "";
  render();
});

if (localStorage.getItem("todo").length > 0) {
  todoData = JSON.parse(localStorage.getItem("todo"));
  render();
}
