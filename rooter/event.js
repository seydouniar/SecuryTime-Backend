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
    const id_agent = req.body.id_agent
    const id_site = req.body.id_site
    const debut = req.body.debut
    const fin = req.body.fin

    const values = [id_agent,id_site,debut,fin]
    const reqquery = "INSERT INTO events(id_agent,id_site,debut,fin) VALUES (?,?,?,?)";
    db.query(reqquery,(err,row,field) =>{
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