const API = "http://localhost:8080/tasks";

let taskList = document.getElementById("taskList");

// ---------------- LOAD TASKS ----------------

function loadTasks(){

 fetch(API)
 .then(res => res.json())
 .then(data => {

   taskList.innerHTML = "";

   data.forEach(task => {

     let li = document.createElement("li");

     li.className = task.completed ? "done" : "";

     li.innerHTML = `
       <b>${task.name}</b><br>
       ${task.date} | ${task.startTime} - ${task.endTime}<br>

       <button onclick="toggleTask(${task.id}, ${task.completed})">✔</button>
       <button onclick="deleteTask(${task.id})">X</button>
     `;

     taskList.appendChild(li);
   });

 });
}

// ---------------- ADD TASK ----------------

function addTask(){

 let name = taskInput.value;
 let date = taskDate.value;
 let start = startTime.value;
 let end = endTime.value;

 if(name==="") return alert("Enter task");

 fetch(API,{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({
     name:name,
     date:date,
     startTime:start,
     endTime:end,
     completed:false
   })
 })
 .then(()=> loadTasks());

 taskInput.value="";
}

// ---------------- DELETE TASK ----------------

function deleteTask(id){

 fetch(`${API}/${id}`,{
   method:"DELETE"
 }).then(()=> loadTasks());

}

// ---------------- TOGGLE COMPLETE ----------------

function toggleTask(id,current){

 fetch(API,{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({
     id:id,
     completed:!current
   })
 }).then(()=> loadTasks());
}

// Load on startup
loadTasks();