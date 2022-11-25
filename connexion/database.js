const mysql = require('mysql');
const fs = require('fs');

var config =
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdd_sauteuhz',
    port: 3000,
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("Erreur : Impossible de se connecter à la base de donnée");
        throw err;
    }
    else
    {
       console.log("Connexion à la base de donnée établis");
           queryDatabase();
    }
});