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

  static async newRelation(req, res) {
    let id = req.params.id;

    const newRelation = req.body;

    let results = UpORM.create({
      idUser: id,
      idPro: newRelation.idPro,
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
