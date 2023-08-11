const { check, validationResult } = require("express-validator");
const TaskORM = require("../models/taskORM");
const { QueryTypes } = require("sequelize");

const validationRulesTasks = [
  check("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Task name must be between 8 and 100 characters"),
  check("date").notEmpty().withMessage("Date is required"),
  check("status").notEmpty().withMessage("Status is required"),
];

class TasksController {
  static async getAllTasks(req, res) {
    let id = req.params.id;
    let results = await TaskORM.sequelize.query(
      "SELECT * FROM tasks WHERE idOwner = ?",
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
    let results = await TaskORM.findByPk(idTask);

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
      let id = req.params.id;
      let results = await TaskORM.sequelize.query(
        "INSERT INTO tasks (name, description, date, status, idOwner) VALUES (?, ?, ?, ?, ?)",
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
      const taskToUpdate = await TaskORM.findByPk(idTask);

      let result = taskToUpdate.update({
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        status: newTask.status,
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
      const task = await TaskORM.findByPk(idTask);
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
  validationRulesTasks,
  TasksController,
};
