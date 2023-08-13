const { check, validationResult } = require("express-validator");
const ProjectORM = require("../models/projectORM");
const UpORM = require("../models/upORM");
const { QueryTypes } = require("sequelize");

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
    let id = req.params.id;
    let results = await ProjectORM.sequelize.query(
      "SELECT * FROM projects INNER JOIN user_projects ON projects.id = user_projects.idPro WHERE idUser = ?;",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    if (results) {
      res.json(results);
      console.log(res);
    }
  }

  static async getProject(req, res) {
    let idPro = req.params.idPro;
    let id = req.params.id;

    let results = await ProjectORM.sequelize.query(
      "SELECT * FROM projects INNER JOIN user_projects ON projects.id = user_projects.idPro WHERE idUser = ? AND idPro = ?;",
      {
        replacements: [id, idPro],
        type: QueryTypes.SELECT,
      }
    );

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
      let id = req.params.id;

      let results = ProjectORM.create({
        name: newProject.name,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
      });

      (await results).save();

      let relation = UpORM.create({
        idUser: id,
        idPro: (await results).dataValues.id,
        type: 1,
      });

      (await relation).save();

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
      let idPro = req.params.idPro;
      const newProject = req.body;
      const projectToUpdate = await ProjectORM.findByPk(idPro);

      let result = await projectToUpdate.update({
        name: newProject.name,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
      });

      if (result) {
        res.send("Project edited");
      } else {
        res.send("Project couldn't be edited");
      }
    }
  }
}

module.exports = {
  validationRulesProjects,
  ProjectsController,
};
