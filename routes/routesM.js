var express = require("express");
var router = express.Router();

const {
  validationRules,
  UsersController,
} = require("../controllers/UsersController");
const {
  validationRulesTasks,
  TasksController,
} = require("../controllers/TasksController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Main Page");
});

// User Routes //
router.get("/register", (req, res) => {
  res.json("Register Page");
});

router.post("/register", validationRules, UsersController.register);

router.get("/login", UsersController.getAllUsers);

router.post("/login", UsersController.login);

router.get("/tasks", TasksController.getAllTasks);

router.post("/tasks", validationRulesTasks, TasksController.newTask);

router.get("/tasks/:id", TasksController.getTask);

router.put("/tasks/:id", TasksController.updateTask);

router.delete("/tasks/:id", TasksController.deleteTask);

module.exports = router;
