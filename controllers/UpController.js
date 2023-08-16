const UpORM = require("../models/upORM");
const { QueryTypes } = require("sequelize");

class UpController {
  static async getAllRelations(req, res) {
    let id = req.params.id;

    let results = await UpORM.sequelize.query(
      "select * from user_projects where idUser = ?;",
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

  static async getMembers(req, res) {
    let id = req.params.id;

    let results = await UpORM.sequelize.query(
      "SELECT us.id, us.name, us.email, up.type FROM users us INNER JOIN user_projects up ON up.idUser=us.id WHERE idPro= ?;",
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

  static async newRelationAdmin(req, res) {
    let id = req.params.id;

    const newRelation = req.body;

    let results = UpORM.create({
      idUser: id,
      idPro: newRelation.idPro,
      type: 1,
    });

    (await results).save();

    if (results) {
      res.send("Relation created");
    } else {
      res.send("Relation couldn't be created");
    }
  }
  static async newRelationInvited(req, res) {
    let id = req.params.id;

    const newRelation = req.body;

    let results = UpORM.create({
      idUser: id,
      idPro: newRelation.idPro,
      type: 2,
    });

    (await results).save();

    if (results) {
      res.send("Relation created");
    } else {
      res.send("Relation couldn't be created");
    }
  }
}

module.exports = {
  UpController,
};
