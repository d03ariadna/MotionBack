const db = require('../config/db');

class UserModel{

    static async getUsers(){
        return new Promise(resolve => {
            db.query("SELECT * FROM users",         //QUERY
                [],                                 //PLACEHOLDERS
                (err, result) => {                  //CALLBACK
                    if (!err) {
                        resolve(result);
                    }
                });
        });
    }

    static async getUser(id){
        return new Promise(resolve => {
            db.query("SELECT * FROM users WHERE id=?", [id],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    }
                });
        });
    }

    static async addUser(username, password, avatar) {
        return new Promise(resolve => {
            db.query(
                "INSERT INTO users (username, password, avatar) VALUES(?,?,?)",
                [
                    username,
                    password,
                    avatar
                ],
                (error, result) => {
                    if (!error) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            );
        });
    }

    static async updateUser(id, username, password, avatar) {
        return new Promise(resolve => {
            db.query(
                "UPDATE users SET username=?, password=?, avatar=? WHERE id=?",
                [
                    username,
                    password,
                    avatar,
                    id
                ],
                (error, result) => {
                    if (!error) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            );
        });
    }

    static async deleteUser(id) {
        return new Promise(resolve => {
            db.query( "DELETE FROM users WHERE id=?",
                [id],
                (error, result) => {
                    if (!error) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            )
        });
    }
}

module.exports = UserModel;