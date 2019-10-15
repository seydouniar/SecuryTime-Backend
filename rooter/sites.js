const express = require('express')
const mysql = require("mysql");

const bodyParser = require("body-parser")
const router = express.Router()
router.use(bodyParser.json())

function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"",
        database: "security_db"
    });
    return connection;
}

router.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//get site 
router.get('/sites',(req,res)=>{
    const reqquery = "SELECT * FROM sites";

    getConnection().query(reqquery,(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("agents fetching succeful",row.insertId)
        const sites = row.map((r) => {
            return { id: r.id_site, nom: r.nom, agence: r.nom_agence,
                adr_facture: JSON.parse(r.adr_facture), adr_site: JSON.parse(r.adresse) }
        })
        res.json(sites)

    })
})

router.get('/sites/:id',(req,res)=>{
    const reqquery = "SELECT * FROM sites WHERE id_site = ?";

    getConnection().query(reqquery,[req.params.id],(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("agents fetching succeful",row.insertId)
        const site = row.map((r) => {
            return { id: r.id_site, nom: r.nom, agence: r.nom_agence,
                adr_facture: JSON.parse(r.adr_facture), adr_site: JSON.parse(r.adr_site),type: r.type }
        })
        res.json(site)

    })
})

//post site 
router.post('sites/new',(req,res)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');


    const data_site = JSON.stringify(req.body.data_site)
    const adresse = JSON.stringify(req.body.adr_site)
    

    const valeurs = [data_site,adresse]
    reqquery = "INSERT INTO sites (data_site,adresse) VALUES ?"
    getConnection().query(reqquery,valeurs,(err,row,fields)=>{
        if(err){
            res.sendStatus(500)
            res.json({success:false})
            res.end()
            return
        }
        res.json({success: true})

    })
})