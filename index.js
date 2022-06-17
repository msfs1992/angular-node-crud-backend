const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_angular',
    port:3306
});

// get all data
app.get('/user', (req,res)=>{
    let qr = "select * from user";

    db.query(qr, (err,result)=>{
        if(err){
            console.log(err, 'queryerr');
        }

        if(result.length>0){
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });
});

//get single data
app.get('/user/:id', (req,res)=>{
    let gID = req.params.id;

    let qr = "select * from user where id = "+gID;

    db.query(qr, (err,result)=>{
        if(err) {console.log(err, 'dbquery');}

        if(result.length>0)
        {
            res.send({
                message: 'get single data',
                data: result
            });
        }
        else
        {
            res.send({
                message: 'data not found'
            });
        }
    });
});

//check database connection
db.connect(err=>{
    if (err) {console.log(err, 'dberr')}
    console.log("Database connected ...")
});


app.post('/user', (req,res)=>{
    console.log(req.body, 'createdata');
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = "insert into user(fullname,email,mobile) values('"+fullName+"', '"+eMail+"', '"+mb+"')";

    db.query(qr, (err,result)=>{
        if(err){console.log(err,'dbquery');}

        res.send({
            message: 'data inserted',
            
        });


    });
});

//update single data
app.put('/user/:id', (req,res)=>{
    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = "update user set fullname = '"+fullName+"', email = '"+eMail+"', mobile = '"+mb+"' where id = '"+gID+"'";
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'data updated'
        });
    });
});

//deleting single data
app.delete('/user/:id', (req,res)=>{
    let qID = req.params.id;

    let qr = "delete from user where id = '"+qID+"'";
    db.query(qr, (err,result)=>{
        if(err) {console.log(err);}

        res.send({
            message: 'data deleted'
        });
    });
});

//listen server
app.listen(3000, ()=>{
    console.log('server running');
});