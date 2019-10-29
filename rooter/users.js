const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser")
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
const db = require("./db_config.js")


router.get("/users/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log("fetching request with id " + req.params.id);

    const reqquery = "SELECT * FROM USERS WHERE id = ?"

    db.query(reqquery, [req.params.id], (err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("users fetching succeful")
        const users = row.map((r) => {
            return { nom: r.nom, prenom: r.prenom }
        })
        res.json(users)

    })
})
router.get("/users", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log("server responding to users");
    const reqquery = "SELECT * FROM users"
    db.query(reqquery, (err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("users fetching succeful")
        const users = row.map((r) => {
            return { id: r.id, nom: r.nom, prenom: r.prenom }
        })
        res.json(users)

    })

})

module.exports = router