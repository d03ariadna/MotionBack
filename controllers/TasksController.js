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
    let results = await TaskORM.findAll();

    if (results) {
      // res.send(results);
      res.json(results);
      console.log(res);
    }
  }

  static async getTask(req, res) {
    let id = req.params.id;
    let results = await TaskORM.findByPk(id);

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

      let results = TaskORM.create({
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        status: newTask.status,
      });

      (await results).save();

      if (results) {
        res.send("Task created");
      } else {
        res.send("Task couldn't be created");
      }
    }
  }

  static async updateTask(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let id = req.params.id;
      const newTask = req.body;
      const taskToUpdate = await TaskORM.findByPk(id);

      let result = await taskToUpdate.update({
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        status: newTask.status,
      });

      if (result) {
        res.redirect("/tasks");
      } else {
        res.send("Task couldn't be modified");
      }
    }
  }

  static async deleteTask(req, res) {
    let id = req.params.id;

    let result = false;

    if (id) {
      const task = await TaskORM.findByPk(id);
      result = await task.destroy();
    }

    res.status(200).send("Task deleted");
  }

}



module.exports = {
  validationRulesTasks,
  TasksController,
};


