const env = require("./config")();

process.env.PORT = env.port;

const session = require("express-session");
const passport = require("passport");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var Routes = require("./routes/routesM");




const schedule = require('node-schedule');
const nodeMailer = require('nodemailer');
const UserORM = require("../MotionBack/models/userORM");
const TaskORM = require("../MotionBack/models/taskORM");





var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "../Motion/public")));

app.use(
  session({
    secret: "clientservercourse",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", Routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404));
  res.status(404).render("notFound");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});




class SendEmail {
  static async getUsersTasks(req, res) {
    let results = await UserORM.findAll();
    let results2 = await TaskORM.findAll();
    let today = new Date()

    if (results) {
      results.forEach(element1 => {
        results2.forEach(element2 => {
          if (element1.id == element2.idOwner){
            let date = new Date(element2.date)
            date.setDate(date.getDate() + 1)
            //console.log(element2.name + " " + date)
            
            if (element2.status != 'DONE' && date < today && today.getDate() - date.getDate() == 1 && today.getMonth() == date.getMonth()){
              console.log(element1.email)
              console.log(element2.name)
              console.log(element2.description)
              console.log("Date: " + date)
              console.log("Today: " + today)
              
              const transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'webappmotion@gmail.com',
                    pass: 'moqnogytywhleyek'
                }
              });

              async function main(){
                const info = await transporter.sendMail({
                    from: 'Motion <webappmotion@gmail.com>',
                    to: element1.email,
                    subject: 'Task Pending: ' + element2.name,
                    html: `<h1>${element2.name}</h1>
                          <h3>Hi! <p>${element1.name}</h3>
                          <h2>You have forgot a task</h2>
                          <b>Name: </b> <p>${element2.name}</p>
                          <b>Description: </b> <p>${element2.description}</p>
                          <b>Deadline: </b> <p>${element2.date}</p>`
                }) 
              }
              
              main()
              console.log("----------------------------------")
            }
          }
        });
      });
    }
  } 
}


schedule.scheduleJob('* * * * *', function(){
  SendEmail.getUsersTasks();
});

module.exports = app;
