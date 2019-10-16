//loading server
const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const routerA = require("./rooter/agent.js")
const routerU = require("./rooter/users.js")
const routerS = require("./rooter/sites.js")
const mysql = require("mysql")
app.use(express.static("./public"))
app.use(morgan("short"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(routerA)
app.use(routerU)
app.use(routerS)
app.get("/",(req,res)=>{
    console.log("server responding to root..");
    res.send("hello world from root")
})



function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"niare",
        database: "security_db",

    });
    return connection;
}

app.post("/user_create", (req, res) => {
    console.log("post data")
    const n = req.body.nom
    const p = req.body.prenom
    queryUser = "INSERT INTO users(nom,prenom) VALUES(?,?)"
    getConnection().query(queryUser, [n, p], (err, row, fields)=>{
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("users fetching succeful", row.insertedId)
        res.end()
    })
})


app.listen(3003,()=>{
    console.log("server listning on 3003 ...");
    
})