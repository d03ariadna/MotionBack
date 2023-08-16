const { check, validationResult } = require("express-validator");
const UserORM = require("../models/userORM");


const validationRules = [
  check("name")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Username must be between 8 and 20 characters"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password must be larger than 6"),
];

class UsersController {
  static async getAllUsers(req, res) {
    let results = await UserORM.findAll();

    if (results) {
      res.json(results);
      console.log(res);
    }
  }

  static async register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      const newUser = req.body;

      const exists = await UserORM.findOne({ where: { email: newUser.email } });

      if (exists != null) {
        res.send("This user already exists. Please log in");
      } else {
        let results = UserORM.create({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          avatar: newUser.avatar,
        });

        (await results).save();

        if (results) {
          res.send("User registered");
        } else {
          res.send("User couldn't be added");
        }
      }
    }
  }

  static async login(req, res) {
    const user = await UserORM.findOne({ where: { email: req.body.email } });

    if (!user) {
      res.status(401).send("Incorrect email. Please try again");
    } else {
      const password = req.body.password;

      if (password == user.password) {
        res.status(200).send("Logged succesfully");
      } else {
        res.status(401).send("Incorrect password");
      }
    }
  }

  static async updateUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg);
    } else {
      let id = req.params.id;
      const newUser = req.body;
      const userToUpdate = await UserORM.findByPk(id);

      let result = await userToUpdate.update({
        username: newUser.username,
        password: newUser.password,
        avatar: newUser.avatar,
      });

      if (result) {
        res.redirect("/users");
      } else {
        res.send("User couldn't be modified");
      }
    }
  }

    static async deleteUser(req, res) {
        let id = req.params.id;

        let result = false;

        if (id) {
            const user = await UserORM.findByPk(id);
            result = await user.destroy();
        }
    }

    

    static async getUser(req, res) {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.send(errors.errors[0].msg);
        }
        else {

            const email = req.params.email;

            const user = await UserORM.findOne({ where: { email: email } })

            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('User not found')
            }
            
            // const userToUpdate = await UserORM.findByPk(id);

            // let result = await userToUpdate.update({
            //     username: newUser.username,
            //     password: newUser.password,
            //     avatar: newUser.avatar
            // });


            // if (result) {
            //     res.redirect('/users');
            // }
            // else {
            //     res.send("User couldn't be modified");
            // }
        }

        
    }

    static async deleteUser(req, res) {

        let id = req.params.id;

        let result = false;

        if (id) {
            
            const user = await UserORM.findByPk(id);
            result = await user.destroy();
        }

        res.status(200).send("OK");
    }

}

module.exports = {
  validationRules,
  UsersController,
};
