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

router.get("/tasks/:id", TasksController.getTask);

module.exports = router;
