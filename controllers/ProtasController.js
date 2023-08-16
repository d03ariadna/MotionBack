const { check, validationResult } = require("express-validator");
const ProtaORM = require("../models/protaORM");
const { QueryTypes } = require("sequelize");

const validationRulesProtas = [
  check("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Task name must be between 8 and 100 characters"),
  check("date").notEmpty().withMessage("Date is required"),
  check("status").notEmpty().withMessage("Status is required"),
];

class ProtasController {

  //Get Tasks by User
  static async getUserTasks(req, res) {
    let id = req.params.idUser;
    let results = await ProtaORM.sequelize.query(
      "SELECT pt.id, pt.name, pt.description, pt.date, pt.status, pt.idProwner from protas pt JOIN projects p ON pt.idProwner=p.id JOIN user_projects up ON up.idPro=p.id where up.idUser = ?;",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    if (results) {
      res.json(results);
    }
  }

  //Get Tasks by Project
  static async getAllTasks(req, res) {
    let id = req.params.idPro;
    let results = await ProtaORM.sequelize.query(
      "SELECT * FROM protas WHERE idProwner = ?;",
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

  static async getTask(req, res) {
    let idTask = req.params.idTask;
    let results = await ProtaORM.findByPk(idTask);

    if (results) {
      res.json(results);
    }
  }

  static async newTask(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      const newTask = req.body;
      let id = req.params.idPro;
      let results = await ProtaORM.sequelize.query(
        "INSERT INTO protas (name, description, date, status, idProwner) VALUES (?, ?, ?, ?, ?)",
        {
          replacements: [
            newTask.name,
            newTask.description,
            newTask.date,
            newTask.status,
            id,
          ],
          type: QueryTypes.INSERT,
        }
      );

      if (results) {
        res.send("OK");
      } else {
        res.send("NOT OK");
      }
    }
  }

  static async updateTask(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let idTask = req.params.idTask;
      const newTask = req.body;
      const taskToUpdate = await ProtaORM.findByPk(idTask);

      let result = taskToUpdate.update({
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        status: newTask.status,
        idProwner: newTask.idProwner
      });

      if (result) {
        res.send("OK");
      } else {
        res.send("Task couldn't be modified");
      }
    }
  }

  static async deleteTask(req, res) {
    let idTask = req.params.idTask;

    let result = false;

    if (idTask) {
      const task = await ProtaORM.findByPk(idTask);
      result = await task.destroy();
    }

    if (result) {
      res.send("OK");
    } else {
      res.send("Task couldn't be deleted");
    }
  }
}

module.exports = {
  validationRulesProtas,
  ProtasController,
};
