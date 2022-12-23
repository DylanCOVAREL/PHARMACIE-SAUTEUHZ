const mysql2 = require('mysql2')
const iniparser = require('iniparser')
let configDB = iniparser.parseSync('./DB.ini')

let mysqlconnexion = mysql2.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
});

mysqlconnexion.connect((err) => {
    if (err) console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})

const Medecins = {
    async afficherMedecins(){
        return new Promise((resolve, reject) => {
            let requeteSQL = "SELECT * FROM medecin"
            mysqlconnexion.query(requeteSQL, (err, lignes) => {
                if(err){
                    return reject(err)
                }
                return resolve(lignes)
            })
        })
    },

    async afficherUnMedecin(req){
        let id = req.params.id
        let requeteSQL = "SELECT * FROM medecin WHERE Medecin_Id = ?"
        return new Promise((resolve, reject)=>{
            mysqlconnexion.query(requeteSQL, [id], (err, lignes) => {
                if(err){
                    return reject(err)
                }
                return resolve(lignes)
            })
        })
    }, 

    async ajouterMedecin(req){
        let nom = req.body.nom
        let prenom = req.body.prenom
        let numero = req.body.numero
        let diplome = req.body.diplome
        let requeteSQL = "INSERT INTO medecin (Medecin_Nom, Medecin_Prenom, Medecin_NumeroTelephone, Medecin_IdDiplome) VALUES(?,?,?,?)"

        return new Promise((resolve, reject)=>{
            mysqlconnexion.query(requeteSQL, [nom, prenom, numero, diplome], (err, lignes, champs) => {
                if(err){
                    return reject(err)
                }
                return resolve(lignes)
            })
        })
    },

    async supprimerMedecin(req){ 
        let id = req.params.id
        let requeteSQL = "DELETE FROM medecin WHERE Medecin_Id = ?"
        return new Promise((resolve, reject)=>{
            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {
                if(err){
                    return reject(err)
                }
                return resolve(lignes)
            })
        })
    },

    async modifierMedecin(req){
        let id = req.params.id
        let nom = req.body.nom
        let prenom = req.body.prenom
        let numero = req.body.numero
        let diplome = req.body.diplome
        let requeteSQL = "UPDATE medecin SET Medecin_Nom = ?, Medecin_Prenom = ?, Medecin_NumeroTelephone = ?, Medecin_IdDiplome = ? WHERE Medecin_Id = ?"
        return new Promise((resolve, reject)=>{
            mysqlconnexion.query(requeteSQL, [nom, prenom, numero, diplome, id], (err, lignes, champs) => {
                if(err){
                    return reject(err)
                }
                return resolve(lignes)
            })
        })
    }
}

module.exports = {
    ModelMedecins
}