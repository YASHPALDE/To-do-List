document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    const span = document.createElement("span"); // Create span element
    span.textContent = taskText;  // Set text content of span

    const checkbox = document.createElement("button"); // Create checkbox button
    checkbox.textContent = "☑️"; // Set checkbox symbol
    checkbox.classList.add("checkbox"); // Add a class for styling
    checkbox.onclick = () => moveTaskToRightBox(li); // Move task to rightbox when clicked

    const removeButton = document.createElement("button"); // Create remove button
    removeButton.textContent = "❌";
    removeButton.onclick = () => moveTaskToLeftBox(li); // Move task to leftbox when clicked

    li.appendChild(checkbox); // Append checkbox to li
    li.appendChild(span);  // Append span to li
    li.appendChild(removeButton); // Append remove button to li

    li.addEventListener("click", toggleComplete); // Use a separate function

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function moveTaskToRightBox(taskItem) {
    const rightBox = document.querySelector(".rightbox");
    rightBox.appendChild(taskItem); // Move the task to the rightbox
    taskItem.querySelector(".checkbox").remove(); // Remove the checkbox after moving
    saveTasks();
}

function moveTaskToLeftBox(taskItem) {
    const leftBox = document.querySelector(".leftbox");
    leftBox.appendChild(taskItem); // Move the task to the leftbox
    taskItem.querySelector("button").remove(); // Remove the remove button after moving
    saveTasks();
}

function toggleComplete(event) {
    if (event.target.tagName !== 'BUTTON') { //Check if the click is not on the button
      this.classList.toggle("completed");
      saveTasks();
    }
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("#taskList li")).map(li => ({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;

        const checkbox = document.createElement("button"); // Create checkbox button
        checkbox.textContent = "☑️"; // Set checkbox symbol
        checkbox.classList.add("checkbox"); // Add a class for styling
        checkbox.onclick = () => moveTaskToRightBox(li); // Move task to rightbox when clicked

        const removeButton = document.createElement("button"); // Create remove button
        removeButton.textContent = "❌";
        removeButton.onclick = () => moveTaskToLeftBox(li); // Move task to leftbox when clicked

        li.appendChild(checkbox); // Append checkbox to li
        li.appendChild(span);  // Append span to li
        li.appendChild(removeButton); // Append remove button to li

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", toggleComplete); // Use the same toggleComplete function

        taskList.appendChild(li);
    });
}