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




//////////////////// USER ROUTES ////////////////////
router.get("/register", (req, res) => {
  res.json("Register Page");
});

router.post("/register", validationRules, UsersController.register);

router.get("/users", UsersController.getAllUsers);

router.get("/user/:email", UsersController.getUser);

router.post("/login", UsersController.login);




//////////////////// TASKS ROUTES ////////////////////
router.get("/:id/tasks", TasksController.getAllTasks);

router.post("/:id/tasks", validationRulesTasks, TasksController.newTask);

router.get("/tasks/:idTask", TasksController.getTask);

router.put("/tasks/:idTask", TasksController.updateTask);

router.delete("/tasks/:idTask", TasksController.deleteTask);




//////////////////// PROJECTS ROUTES ////////////////////
router.get("/:id/projects", ProjectsController.getAllProjects);

router.post(
  "/:id/projects",
  validationRulesProjects,
  ProjectsController.newProject
);

router.get("/:id/projects/:idPro", ProjectsController.getProject);

router.put("/projects/:idPro", ProjectsController.updateProject);




//////////////////// PROJECT TASKS ROUTES ////////////////////
//Get Tasks by USER
router.get("/projects/tasks/:idUser", ProtasController.getUserTasks);

//Get Tasks by PROJECT
router.get("/projects/:idPro/tasks", ProtasController.getAllTasks);

//Create a Project Task with ProjectID
router.post("/projects/tasks/:idPro", validationRulesProtas, ProtasController.newTask);

router.get("/projects/tasks/:idTask", ProtasController.getTask);

//Update a Project Task with TaskID
router.put("/projects/tasks/:idTask", ProtasController.updateTask);

router.delete("/projects/tasks/:idTask", ProtasController.deleteTask);




//////////////////// NOTES ROUTES ////////////////////
router.get("/:idPro/notes", NotesController.getAllNotes);

router.get("/notes/:noteid", NotesController.getNote);

router.post("/:idPro/notes", validationRulesNotes, NotesController.newNote);

router.put("/notes/:noteid", NotesController.updateNote);

router.delete("/notes/:noteid", NotesController.deleteNote);



//////////////////// MEMBERS ROUTES ////////////////////
router.get("/projects/:id/members", UpController.getMembers);

router.get("/user/:id/projects", UpController.getAllRelations);

router.post("/useradmin/:id/projects", UpController.newRelationAdmin);

router.post("/userinvited/:id/projects", UpController.newRelationInvited);
/////////////////////////////////////////////////////////////////////////////////



module.exports = router;
