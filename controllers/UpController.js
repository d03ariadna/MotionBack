const UpORM = require("../models/upORM");
const userORM = require("../models/userORM");

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
    let idPro = req.params.id;
    const email = req.body.email;

    const user = await userORM.findOne({ where: { email: email } });
    let results;
    if (!user) {
      res.status(404).send("Incorrect email. Please try again");
    } else {
      console.log(user);
      let id = user.id;
      results = UpORM.create({
        idUser: id,
        idPro: idPro,
        type: 2,
      });

      (await results).save();
      if (results) {
        res.status(200).send("Relation created");
      } else {
        res.status(500).send("Relation couldn't be created");
      }
    }

  }
}

module.exports = {
  UpController,
};
