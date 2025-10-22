var taskInput = document.getElementById("t1");
var addBtn = document.getElementById("btn1");
var taskTable = document.getElementById("tasktable");

addBtn.addEventListener("click", () => {
  var taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  var row = document.createElement("tr");


  var doneCell = document.createElement("td");
  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  doneCell.appendChild(checkBox);


  var taskCell = document.createElement("td");
  var taskText = document.createElement("span");
  taskText.textContent = text;

  var editIcon = document.createElement("span");
  editIcon.textContent = "✏️";
  editIcon.classList.add("edit-btn");


  editIcon.addEventListener("click", () => {
    if (!checkBox.checked) {
      editTask(taskText);
    } else {
      alert("Can't edit✅");
    }
  });

  taskCell.appendChild(taskText);
  taskCell.appendChild(editIcon);


  var deleteCell = document.createElement("td");
  var deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = "🗑️";
  deleteIcon.classList.add("delete-btn");
  deleteIcon.addEventListener("click", () => {
    let confirmed = confirm("are you sure to delete this task?");
    if (confirmed) row.remove();
  });
  deleteCell.appendChild(deleteIcon);


  row.appendChild(doneCell);
  row.appendChild(taskCell);
  row.appendChild(deleteCell);

  taskTable.appendChild(row);


  checkBox.addEventListener("change", () => {
    row.classList.toggle("done");
  });
}


function editTask(taskSpan) {
  var oldText = taskSpan.textContent;
  var input = document.createElement("input");
  input.type = "text";
  input.value = oldText;


  taskSpan.replaceWith(input);
  input.focus();


  input.addEventListener("blur", () => saveEdit(input));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit(input);
  });
}

function saveEdit(input) {
  var newText = input.value.trim();
  if (newText === "") {
    alert("Task cannot be empty");
    return;
  }
  var span = document.createElement("span");
  span.textContent = newText;
  input.replaceWith(span);
}
