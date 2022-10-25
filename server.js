const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const uuid = require("uuid");

app.use(cors());
app.use(express.json());

app.post("/task-tracker", (req, res) => {
  let rawdata = fs.readFileSync("task.json");
  const tasks = JSON.parse(rawdata);

  const newTask = {
    taskID: uuid.v4(),
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
  };
  tasks.push(newTask);

  let data = JSON.stringify(tasks);
  fs.writeFileSync("task.json", data);
  res.sendStatus(200);
});

app.get("/tasks", (req, res) => {
  let rawdata = fs.readFileSync("task.json");
  const tasks = JSON.parse(rawdata);
  res.send(tasks);
});

app.delete("/task", (req, res) => {
  let rawdata = fs.readFileSync("task.json");
  const tasks = JSON.parse(rawdata);

  const newTasks = tasks.filter((task) => task.taskID != req.body.taskID);
  let data = JSON.stringify(newTasks);
  fs.writeFileSync("task.json", data);
  res.sendStatus(200);
});

app.patch("/task", (req, res) => {
  const id = req.body.taskID;
  const taskName = req.body.taskName;
  let rawdata = fs.readFileSync("task.json");
  const tasks = JSON.parse(rawdata);
  const newTasks = tasks.map((task) => {
    if (task.taskID == id) {
      task.taskName = taskName;
      return task;
    }

    return task;
  });

  let data = JSON.stringify(newTasks);
  fs.writeFileSync("task.json", data);
  res.sendStatus(200);
});

app.listen(8080, () => {
  console.log("hi");
});
