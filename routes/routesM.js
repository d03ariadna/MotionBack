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
const {
  validationRulesProtas,
  ProtasController,
} = require("../controllers/ProtasController");
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

router.get("/login", UsersController.getAllUsers);

router.post("/login", UsersController.login);

router.get("/:id/tasks", TasksController.getAllTasks);

router.post("/:id/tasks", validationRulesTasks, TasksController.newTask);

router.get("/:id/tasks/:idTask", TasksController.getTask);

router.put("/:id/tasks/:idTask", TasksController.updateTask);

router.delete("/:id/tasks/:idTask", TasksController.deleteTask);

router.get("/:id/projects", ProjectsController.getAllProjects);

router.post(
  "/:id/projects",
  validationRulesProjects,
  ProjectsController.newProject
);

router.get("/:id/projects/:idPro", ProjectsController.getProject);

router.put("/:id/projects/:idPro", ProjectsController.updateProject);

router.get("/:id/projects/:idPro/notes", NotesController.getAllNotes);

router.get("/:id/projects/:idPro/notes/:noteid", NotesController.getNote);

router.post(
  "/:id/projects/:idPro/notes",
  validationRulesNotes,
  NotesController.newNote
);

router.put("/:id/projects/:idPro/notes/:noteid", NotesController.updateNote);

router.delete("/:id/projects/:idPro/notes/:noteid", NotesController.deleteNote);

router.get("/user/:id/projects", UpController.getAllRelations);

router.post("/useradmin/:id/projects", UpController.newRelationAdmin);

router.post("/userinvited/:id/projects", UpController.newRelationInvited);

router.get("/projects/:id/members", UpController.getMembers);

router.get("/:id/projects/:idPro/tasks", ProtasController.getAllTasks);

router.post(
  "/:id/projects/:idPro/tasks",
  validationRulesProtas,
  ProtasController.newTask
);

router.get("/:id/projects/:idPro/tasks", ProtasController.getTask);

router.put("/:id/projects/:idPro/tasks", ProtasController.updateTask);

router.delete("/:id/projects/:idPro/tasks", ProtasController.deleteTask);

module.exports = router;
