const NoteORM = require("../models/noteORM");
const { QueryTypes } = require("sequelize");
const { check, validationResult } = require("express-validator");

const validationRulesNotes = [
  check("content")
    .notEmpty()
    .withMessage("A note can't be empty")
    .isLength({ min: 1, max: 250 })
    .withMessage("Note must be between 1 and 250 characters"),
];

class NotesController {
  static async getAllNotes(req, res) {
    let id = req.params.id;
    let results = await NoteORM.sequelize.query(
      "select * from notes where idProject = ?;",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    if (results) {
      // res.send(results);
      res.json(results);
      console.log(res);
    }
  }

  static async getNote(req, res) {
    let noteid = req.params.noteid;
    let results = await NoteORM.findByPk(noteid);

    if (results) {
      res.json(results);
    }
  }

  static async newNote(req, res) {
    const errors = validationResult(req);
    let newNotePI = req.params.id;

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      const newNote = req.body;

      let results = NoteORM.create({
        content: newNote.content,
        idProject: newNotePI,
      });

      (await results).save();

      if (results) {
        res.send("Note created");
      } else {
        res.send("Note couldn't be created");
      }
    }
  }

  static async updateNote(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let id = req.params.id;
      let noteid = req.params.noteid;
      const newNote = req.body;
      const noteToUpdate = await NoteORM.findByPk(noteid);

      let result = await noteToUpdate.update({
        content: newNote.content,
      });

      if (result) {
        res.redirect("/projects/" + id + "/notes");
      } else {
        res.send("Note couldn't be modified");
      }
    }
  }

  static async deleteNote(req, res) {
    let noteid = req.params.noteid;

    let result = false;

    if (noteid) {
      const note = await NoteORM.findByPk(noteid);
      result = await note.destroy();
    }

    res.status(200).send("Note deleted");
  }
}

module.exports = {
  NotesController,
  validationRulesNotes,
};
