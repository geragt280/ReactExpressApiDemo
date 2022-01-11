var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var database = require('../config/database');
const { validate, ValidationError, Joi } = require("express-validation");

const getUserValidation = {
    body: Joi.object({
      email: Joi.string().required(),
    }),
  };

app.get('/Users', (req, res) => {
    let sql = "SELECT id,email,created_at FROM `users`";
    database.query(sql, (err, result) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        if(result.length){
            res.json(result);
        }
        else
            res.json({});
    })
});

app.post(
    "/SpecificUser",
    (result = validate(getUserValidation, {}, {})),
    async (req, res) => {
        var email = req.body.email;
        let sql = `select name,bio,cnic,education,address,image from users where email='${email}'`;
        await database.query(sql, async (err, result) => {
            if (err) {
                errjson(res, err, false);
                return;
            }
            if (result.length) {
                return successjson(res, "Request Succesful", true, result);
            }else{
                return errjson(res, "No data retrived.", false);
            }
        });
    }
  );

function successjson(res, message, status, data){
    return res.status(200).json({
        status:status,
        message: message,
        data:data[0],
    });
}

function errjson(res, message, status){
    return res.status(200).json({
        status:status,
        message: message,
    });
}

// app.get('/userinfo/:email', (req, res) => {
//     let sql = `SELECT * FROM userinfo WHERE email = '${req.params.email}'`;

//     database.query(sql, (err, result) => {
//         if(err){
//             res.status(400).send(err);
//             return;
//         }
//         if(result.length){
//             res.json(result);
//         }
//         else
//             res.json({});
//     })
// });


module.exports = app;

