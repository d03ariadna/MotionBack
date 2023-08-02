var express = require('express');
var router = express.Router();

const {validationRules, UsersController} = require('../controllers/UsersController');
const UserORM = require('../models/userORM');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Main Page');
});




// User Routes //
router.get('/register', (req, res) => {
  res.json('Register Page');
});

router.post('/register', validationRules, UsersController.register);

router.get('/login', UsersController.getAllUsers);

router.post('/login', UsersController.login);





module.exports = router;
