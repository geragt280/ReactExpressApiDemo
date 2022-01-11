var express = require("express");
const request = require('request');
var hasher = require("node-hasher");
var path = require('path');
var fs = require('fs');
var app = express();
var database = require("../config/database");
const { validate, ValidationError, Joi } = require("express-validation");

var dir = path.join("images");

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required(),
    browser_id: Joi.string().required(),
  }),
};

const updateValidation = {
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    bio: Joi.string().required(),
    cnic: Joi.string().required(), 
    address: Joi.string().required(),
    education: Joi.string().required(),
    image: Joi.string().required()
  }),
};

app.post(
  "/Login",
  (result = validate(loginValidation, {}, {})),
  async (req, res) => {
    var email = req.body.email;
    var hash = hasher("md5", req.body.password);
    const browser_id = req.body.browser_id;
    var deviceid = 0;
    var userid = 0;

    let sql = `SELECT id from users where email = '${email}' and password='${hash}'`;
    await database.query(sql, async (err, result) => {
      if (err) {
        errjson(res, err, false);
        return;
      }
      if (result.length) {
        userid = result[0].id;
        sql = `SELECT devices.id FROM devices WHERE devices.device_key='${browser_id}';`;
        await database.query(sql, async (err, result) => {
          if (err) {
            errjson(res, err, false);
            return;
          }
          if (result.length) {
            deviceid = result[0].id;
            sql = `INSERT INTO logs(user_id, device_id, action) VALUES ('${userid}','${deviceid}', 'Login with old device')`;
            await database.query(sql, (err, result) => {
              if (err) {
                errjson(res, err, false);
                return;
              } 
              if(result.insertId) {
                return successjson(res, "Login succesful with old device.", true);
              }
            });
          } else {
            sql = `INSERT INTO devices(device_key) VALUES ('${browser_id}')`;
            database.query(sql, async (err, result) => {
              if (err) {
                errjson(res, err, false);
                return;
              }
              if (result.insertId) {
                deviceid = result.insertId;
                sql = `INSERT INTO logs(user_id, device_id, action) VALUES ('${userid}','${deviceid}', 'Login with new device')`;
                await database.query(sql, (err, result) => {
                  if (err) {
                    errjson(res, err, false);
                    return;
                  } 
                  if(result.insertId) {
                    return successjson(res, "Login succesful with new device.", true);
                  }
                });
              }
            });
          }
        });
      } else {
        return successjson(res, "Wrong email or password.", false);
      }
    });
  }
);

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

app.get('/Images/:picname', function (req, res) {
  var file = path.join(dir, req.params.picname);
  if (file.indexOf(dir + path.sep) !== 0) {
      return res.status(403).end('Forbidden');
  }
  var type = mime[path.extname(file).slice(1)] || 'text/plain';
  var s = fs.createReadStream(file);
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
});

app.post(
  "/UpdateUser",
  (result = validate(updateValidation, {}, {})),
  async (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var bio = req.body.bio;
    var cnic = req.body.cnic;
    var education = req.body.education;
    var address = req.body.address;
    var imageEncoded = req.body.image;
    // console.log("image : ",image);
    const fileContents = new Buffer.from(imageEncoded, 'base64')
    fs.writeFile(`images/${name}.png`, fileContents, (err) => {
      if (err) return console.error(err)
      console.log('file saved to ', `images/${name}.png`);
      
    });
    var image = `${name}.png`;
    let sql = `UPDATE users SET name='${name}', bio='${bio}', CNIC='${cnic}', education='${education}', address='${address}', image='${image}' WHERE email='${email}'`;
    await database.query(sql, async (err, result) => {
      if (err) {
        errjson(res, err, false);
        return;
      }
      if (result.affectedRows) {
        return successjson(res, "Your profile information is updated.", true);
      }
      else{
        return errjson(res, "No Data was changed.", false);
      }
    });
  }
);

function errjson(res, err, status) {
  return res.status(200).json({
    status: status,
    message: err,
  });
}
function successjson(res, message, status) {
  return res.status(200).json({
    status: status,
    message: message,
  });
}

app.use(function (err, req, res, next) {
  return res.status(200).json({
    status: false,
    message: err
  });
});

app.post("/Register", (req, res) => {
  var sql = `select * from users where email='${req.body.email}'`;
  database.query(sql, (err, result) => {
    if (err) {
      res.status(200).json({
        message: err,
      });
      return;
    }
    if (result.length) {
      res.status(200).json({
        status: true,
        message: "A user with this email already exists.",
      });
    } else {
      var hash = hasher("md5", req.body.password);
      sql = `INSERT INTO users (email, password) values ('${req.body.email}', '${hash}'); `;

      database.query(sql, (err, result) => {
        if (err) {
          res.status(200).json({
            status: false,
            message: "Error in Insert." + err,
          });
          return;
        }
        res.status(200).json({
          status: true,
          message: "User registered Successfully.",
        });
      });
    }
  });
});

module.exports = app;