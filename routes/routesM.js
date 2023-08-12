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
const {
  validationRulesProjects,
  ProjectsController,
} = require("../controllers/ProjectsController");
const {
  validationRulesNotes,
  NotesController,
} = require("../controllers/NotesController");
const { UpController } = require("../controllers/UpController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Main Page");
});

// User Routes //
router.get("/register", (req, res) => {
  res.json("Register Page");
});

router.post("/register", validationRules, UsersController.register);

router.get("/users", UsersController.getAllUsers);

router.get("/user/:email", UsersController.getUser);

router.post("/login", UsersController.login);

router.get("/:id/tasks", TasksController.getAllTasks);

router.post("/:id/tasks", validationRulesTasks, TasksController.newTask);

router.get("/:id/tasks/:idTask", TasksController.getTask);

router.put("/:id/tasks/:idTask", TasksController.updateTask);

router.delete("/:id/tasks/:idTask", TasksController.deleteTask);

router.get("/projects", ProjectsController.getAllProjects);

router.post(
  "/projects",
  validationRulesProjects,
  ProjectsController.newProject
);

router.get("/projects/:id", ProjectsController.getProject);

router.put("/projects/:id", ProjectsController.updateProject);

router.delete("/projects/:id", ProjectsController.deleteProject);

router.get("/projects/:id/notes", NotesController.getAllNotes);

router.get("/projects/:id/notes/:noteid", NotesController.getNote);

router.post(
  "/projects/:id/notes",
  validationRulesNotes,
  NotesController.newNote
);

router.put("/projects/:id/notes/:noteid", NotesController.updateNote);

router.delete("/projects/:id/notes/:noteid", NotesController.deleteNote);

router.get("/user/:id/projects", UpController.getAllRelations);

router.post("/useradmin/:id/projects", UpController.newRelationAdmin);

router.post("/userinvited/:id/projects", UpController.newRelationInvited);

router.get("/projects/:id/members", UpController.getMembers);

module.exports = router;
