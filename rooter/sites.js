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
            return { id: r.id_site,id_client:r.id_client,dataSite: JSON.parse(r.data_site), adresse: JSON.parse(r.adresse) }
        })
        res.json(sites)

    })
})

//get clients
router.get('/clients',(req,res)=>{
    const reqquery = "SELECT * FROM clients";

    getConnection().query(reqquery,(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("clients fetching succeful",row.insertId)
        const clients = row.map((r) => {
            return { id: r.id_client, client_data: JSON.parse(r.client_data) }
        })
        res.json(clients)

    })
})

//site by Id
router.get('/sites/:id',(req,res)=>{
    const reqquery = "SELECT * FROM sites WHERE id_site = ?";
    getConnection().query(reqquery,[req.params.id],(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }

        const site = row.map((r) => {
            return { id: r.id_site,id_client:r.id_client, dataSite: JSON.parse(r.data_site), adresse: JSON.parse(r.adresse) }
        })
        res.json(site)

    })
})


//post site 
router.post('/sites/new',(req,res)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');


    const data_site = JSON.stringify(req.body.data_site)
    const adresse = JSON.stringify(req.body.adresse)
    const id_client = parseInt(req.body.id_client)
    

    const valeurs = [id_client,data_site,adresse]
    console.log(valeurs);
    
    reqquery = "INSERT INTO sites (id_client,data_site,adresse) VALUES (?,?,?)"
    getConnection().query(reqquery,valeurs,(err,row,fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err);
            
            res.json({success:false})
            res.end()
            return
        }
        res.json({success: true})

    })
})

//post client
router.post('/clients/new',(req,res)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    const client_data = JSON.stringify(req.body)
    
    const valeurs = [client_data]
    console.log(valeurs);
    
    reqquery = "INSERT INTO clients (client_data) VALUES (?)"
    getConnection().query(reqquery,valeurs,(err,row,fields)=>{
        if(err){
            console.log(err);
            
            res.sendStatus(500)
            console.log(err);
            
            res.json({success:false})
            res.end()
            return
        }
        res.json({success: true})

    })

})

module.exports = router