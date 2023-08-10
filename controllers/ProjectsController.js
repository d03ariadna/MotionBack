const { check, validationResult } = require("express-validator");
const ProjectORM = require("../models/projectORM");

const validationRulesProjects = [
  check("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Task name must be between 1 and 100 characters"),
  check("description").notEmpty().withMessage("Description is required"),
];

class ProjectsController {
  static async getAllProjects(req, res) {
    let results = await ProjectORM.findAll();

    if (results) {
      res.json(results);
      console.log(res);
    }
  }

  static async getProject(req, res) {
    let id = req.params.id;
    let results = await ProjectORM.findByPk(id);

    if (results) {
      res.json(results);
    }
  }

  static async newProject(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      const newProject = req.body;

      let results = ProjectORM.create({
        name: newProject.name,
        description: newProject.description,
        color: newProject.color,
      });

      (await results).save();

      if (results) {
        res.send("Project created");
      } else {
        res.send("Project couldn't be created");
      }
    }
  }

  static async updateProject(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let id = req.params.id;
      const newProject = req.body;
      const projectToUpdate = await ProjectORM.findByPk(id);

      let result = await projectToUpdate.update({
        name: newProject.name,
        description: newProject.description,
        color: newProject.color,
      });

      if (result) {
        res.redirect("/projects");
      } else {
        res.send("Project couldn't be modified");
      }
    }
  }

  static async deleteProject(req, res) {
    let id = req.params.id;

    let result = false;

    if (id) {
      const project = await ProjectORM.findByPk(id);
      result = await project.destroy();
    }

    res.status(200).send("Project deleted");
  }
}

module.exports = {
  validationRulesProjects,
  ProjectsController,
};
