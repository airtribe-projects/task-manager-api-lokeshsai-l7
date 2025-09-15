const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all tasks

app.get("/tasks", (req, res) => {
  try {
    const tasksData = JSON.parse(fs.readFileSync("task.json", "utf8")).tasks;

    if (tasksData && tasksData.length > 0) {
      res.status(200).send(tasksData);
    } else {
      res.status(404).send({ error: "No tasks found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to read tasks" });
  }
});

// Get task by ID

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const tasksData = JSON.parse(fs.readFileSync("task.json", "utf8")).tasks;
    if (tasksData.length > 0) {
      const task = tasksData.find((t) => t.id === taskId);
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send({ error: "Task not found" });
      }
    } else {
      res.status(404).send({ error: "No tasks found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to read tasks" });
  }
});

// Create a new task

app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (
    !title ||
    !description ||
    (completed === undefined && typeof completed !== "boolean")
  ) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  try {
    const tasksData = JSON.parse(fs.readFileSync("task.json", "utf8")).tasks;

    const newTask = {
      id: tasksData.length > 0 ? tasksData[tasksData.length - 1].id + 1 : 1,
      title,
      description,
      completed,
    };
    tasksData.push(newTask);
    fs.writeFileSync(
      "task.json",
      JSON.stringify({ tasks: tasksData }, null, 2)
    );
    res.status(201).send({ message: "Task created successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to read tasks" });
  }
});

// Update a task

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  try {
    if (
      !title ||
      !description ||
      (completed === undefined && typeof completed !== "boolean")
    ) {
      res.status(400).send({ error: "Missing required fields" });
    } else {
      const tasksData = JSON.parse(fs.readFileSync("task.json", "utf8")).tasks;

      const taskIndex = tasksData.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        tasksData[taskIndex] = { id: taskId, title, description, completed };
        fs.writeFileSync(
          "task.json",
          JSON.stringify({ tasks: tasksData }, null, 2)
        );
        res.status(200).send(tasksData[taskIndex]);
      } else {
        res.status(404).send({ error: "Task not found" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to read tasks" });
  }
});

// Delete the Task

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const tasksData = JSON.parse(fs.readFileSync("task.json", "utf8")).tasks;
    const taskIndex = tasksData.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedData = tasksData.filter((task) => task.id !== taskId);
      fs.writeFileSync(
        "task.json",
        JSON.stringify({ tasks: updatedData }, null, 2)
      );
      res.status(200).send({ message: "Task is deleted" });
    } else {
      res.status(404).send({ error: "Task Id is Invalid" });
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to read tasks" });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
