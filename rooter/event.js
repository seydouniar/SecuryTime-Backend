const express = require('express')

const bodyParser = require("body-parser")
const router = express.Router()
const db = require("./db_config.js")
router.use(bodyParser.json())



router.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

router.get('/events',(req,res)=>{
    
    const reqquery = "SELECT * FROM events";
    
    db.query(reqquery,(err,row,field)=>{
        return new Promise((resolve,reject) =>{
            if (err) {
                res.sendStatus(500)
                console.log(err);
                reject(err)
                res.end()
            }else{
                console.log("fetch Event.....");
                
                const event = row.map((r) => {
                    
                    return {
                        id: r.id,
                        id_agent: r.id_agent,
                        id_site: r.id_site,
                        debut: r.debut,
                        fin: r.fin
                    }
                })
                res.json(event)
                resolve(event)
            }
        })
        
        
        
    })
})

router.post('/events/new', (req, res) => {
    
    const id_site = parseInt(req.body.site)
    const debut = req.body.debut
    const fin = req.body.fin
    console.log(id_site);
    
    const values = [id_site,debut,fin]
    const reqquery = "INSERT INTO events(id_site,debut,fin) VALUES (?,?,?)";
    db.query(reqquery,values,(err,row,field) =>{
        return new Promise((resolve,reject)=>{
            if (err) {
                res.sendStatus(500)
                console.log(err);
                res.json({success: false})
                res.end()
                return
            }else{
                res.json({success: true})
                resolve({success: true})
            }
        })
        
        
    })
})


router.post('/events/add_agent', (req, res) => {
    const id_agent = parseInt(req.body.id_agent)
    const id = parseInt(req.body.id)

    const values = [id_agent,id]
    const reqquery = "UPDATE events SET id_agent=? WHERE id = ?";
    db.query(reqquery,values,(err,row,field) =>{
        return new Promise((resolve,reject)=>{
            if (err) {
                res.sendStatus(500)
                console.log(err);
                res.json({success: false})
                res.end()
                return
            }else{
                res.json({success: true})
                resolve({success: true})
            }
        })
        
        
    })
})

router.post('/events/update', (req, res) => {
    const heure_debut = req.body.debut
    const heure_fin = req.body.fin
    const id = parseInt(req.body.id)

    const values = [heure_debut,heure_fin,id]
    console.log(values);
    
    const reqquery = "UPDATE events SET debut = ?, fin = ? WHERE id = ?";
     db.query(reqquery,values,(err,row,field) =>{
        return new Promise((resolve,reject)=>{
            if (err) {
                res.sendStatus(500)
                console.log(err);
                res.json({success: false})
                res.end()
                return
            }else{
                
                res.json({success: true})
                resolve({success: true})
                console.log(row);
                
                
            }
        })
        
        
    })
})

router.delete('/events/delete', (req, res) => {
   
    const id = parseInt(req.body.id)

    const values = [id]
    const reqquery = "DELET FROM events WHERE id = ?";
    db.query(reqquery,values,(err,row,field) =>{
        return new Promise((resolve,reject)=>{
            if (err) {
                res.sendStatus(500)
                console.log(err);
                res.json({success: false})
                res.end()
                return
            }else{
                res.json({success: true})
                resolve({success: true})
            }
        })
        
        
    })
})


module.exports=router;