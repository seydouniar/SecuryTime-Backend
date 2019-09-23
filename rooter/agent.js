const express = require('express')
const mysql = require("mysql");

const bodyParser = require("body-parser")
const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "security_db",

    });
    return connection;
}

router.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

router.get("/agents",(req,res)=>{
    console.log("liste des agent");
    const reqquery = "SELECT * FROM AGENTS";

    getConnection().query(reqquery, (err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("agents fetching succeful")
        const users = row.map((r) => {
            return { id: r.id_agent, matricule: r.matricule, genre: r.genre,
                nom: r.nom, adresse: r.adresse, cp: r.code_postale,
                ville: r.ville, pays: r.pays, contacts: r.contacts }
        })
        res.json(users)

    })
})
router.post("/agents/new", (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    const matricule = parseInt(req.body.matricule)
    const nom = req.body.nom+" "+req.body.prenom
    const genre = req.body.genre
    const adresse = req.body.adresse
    const code_postale = parseInt(req.body.code_postale)
    const ville = req.body.ville
    const pays = req.body.pays
    const contacts = req.body.contacts
    

    const valeurs = [matricule,nom,genre,adresse,code_postale,ville,pays,contacts]
    console.log(valeurs);
    
    
    
    const reqquery = "INSERT INTO agents(matricule,nom,genre,adresse,code_postale,ville,pays,contacts) VALUES (?,?,?,?,?,?,?,?)";
    getConnection().query(reqquery, valeurs,(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("users fetching succeful",row.insertedId)
        res.end()
    })

    res.end()
    
})

module.exports=router