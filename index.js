// inclure les dépendances et middlewares
const mysql = require('mysql')
const express = require('express')
const ejs = require('ejs')
const session = require('express-session');
const flash = require('connect-flash');
const iniparser = require('iniparser')
const Routeur = require('./routes/routes');

// activer les dépendances
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('views'))
app.use(express.urlencoded());
app.use(flash());

app.listen(3000, () => console.log('Le serveur est fonctionnel !'))
app.get('/', (req, res) => {
    res.send('Le serveur est fonctionnel !')
})

<<<<<<< HEAD
app.use('/PSauteuhz', Routeur)
=======
app.use('/pharmaciesautheuhz', Routeur)
>>>>>>> 6424395d458d00de29db95df55b099212c5d9ce7
