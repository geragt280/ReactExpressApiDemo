var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 3005;
var database = require('./config/database')

database.connect((err) => {
    if(err) throw err;
})

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}
));

app.use('/', [
    require('./route/authentication')
]);

app.use('/', [
    require('./route/users')
]);




// app.get('/userinfo/:username', (req, res) => {
//     let sql = `SELECT * FROM userinfo WHERE username = ${req.params.username}`;

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

app.listen(port, () => {
    console.log(`listening at ${port}`);
});


