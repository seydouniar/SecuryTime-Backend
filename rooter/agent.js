const express = require('express')
const mysql = require("mysql");

const bodyParser = require("body-parser")
const router = express.Router()
router.use(bodyParser.json())

function getConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"niare",
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

//get agent by id
router.get("/agents",(req,res)=>{
    console.log("liste des agent");
    const reqquery = "SELECT * FROM agents";

    getConnection().query(reqquery,(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("agents fetching succeful",row.insertId)
        const users = row.map((r) => {
            return { id: r.id_agent, matricule: r.matricule, genre: r.genre,
                nom: r.nom, adresse: JSON.parse(r.adresse), contacts: JSON.parse(r.contacts) }
        })
        res.json(users)

    })
})

router.get("/agents/:id", (req, res) => {
    console.log("liste des agent");
    const reqquery = "SELECT * FROM agents WHERE id_agent = ?";
    console.log(req.params.id);
    
    getConnection().query(reqquery,[req.params.id],(err, row, fields) => {
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        const agent = row.map((r) => {
            return { id: r.id_agent, matricule: r.matricule, genre: r.genre,
                nom: r.nom, adresse: JSON.parse(r.adresse), contacts: JSON.parse(r.contacts) }
        })
        res.json(agent)
    }) 

})

router.post("/agents/new", (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    const matricule = parseInt(req.body.matricule)
    const nom = req.body.nom+" "+req.body.prenom
    const genre = req.body.genre
    const adresse = JSON.stringify(req.body.adresse)
    const contacts = JSON.stringify(req.body.contacts)
    const cni = req.body.cni
    const ca = req.body.carte_agent

    
    const valeurs = [matricule,nom,genre,adresse,contacts]
    
    console.log(cni,ca)
    const connection = getConnection()
    const reqquery = "INSERT INTO agents(matricule,nom,genre,adresse,contacts) VALUES (?,?,?,?,?)";
    connection.connect((err)=> {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    connection.beginTransaction((err)=>{
        if(err){
            res.json({success: false})
            console.log(err);
            return
            
        }
    })
    connection.query(reqquery, valeurs,(err, row, fields) => {
        if (err) {
            connection.rollback(() =>{
                res.json({success: false})
                console.log(err);
                return
                
            });

        }else{
            console.log("agent inserted with id",row.insertId)
            const v_cni = [row.insertId, cni.delivre, cni.fin, cni.numero, 'cni']
            const v_ca = [row.insertId, ca.delivre, ca.fin, ca.numero, 'ca']
            console.log([v_cni, v_ca]);
            
            const queryCarte = "INSERT INTO cartes (id_agent,delivre,fin,numero,type) VALUES (?)"
        
            connection.query(queryCarte,[v_cni],(err,row,fields) =>{
            if (err) {
                connection.rollback(function () {
                   console.log(err) 
                    return
                });
            }else{
                connection.query(queryCarte,[v_ca],(err,row,fields) =>{
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        });
                    } else {
                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                            res.json({
                                success: true
                            })
                            console.log('Transaction Complete.');
                            connection.end();
                        });
                    }
                })
                
                
            }
        })
    }
        
    })
      
})


module.exports=router