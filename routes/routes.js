// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// Utilisation de VAR et pas de LET afin de définir les variables de facons globale et ne pas etre limité. 
//Permet d'utiliser les variables presentes en dessous un peu partout dans le code.
var way_accueil = require('../controllers/Control_Accueil')
var way_maladie = require('../controllers/Control_Maladies');
var way_medecins = require('../controllers/Control_Medecins');
var way_mutuelle = require('../controllers/Control_Mutuelles');
var way_ordonnances = require('../controllers/Control_Ordonnances')
var way_patients = require('../controllers/Control_Patients')
var way_stocks = require('../controllers/Control_Stocks')

// Routage effectuer sur l'accueil de la page de notre Pharmacie Sauteuhz
routeur.get('/accueil', way_accueil.accueil_display)
    .get('/', way_accueil.accueil_display)

// Routage effectuer sur la page comportant les informations des Medecins 
routeur.get('/liste_medecins',way_medecins.afficher_liste_medecins)
    .get('/form_medecin', way_medecins.afficher_form_medecin)
    .get('/fiche_medecin/:id', way_medecins.afficher_fiche_medecin)
    .post('/form_medecin', way_medecins.executer_form_medecin)
    .post('/fiche_medecin/:id', way_medecins.update_form_medecin)
    .post('/delete_medecin/:id', way_medecins.delete_fiche_medecin)

// Routage effectuer sur la page comportant les informations des Mutuelles 
routeur.get('/liste_mutuelles', way_mutuelle.afficher_liste_mutuelles)
    //.get('/form_mutuelle', way_mutuelle.afficher_form_mutuelle)
    //.get('/fiche_mutuelle/:id', way_mutuelle.afficher_fiche_mutuelle)
    .post('/form_mutuelle', way_mutuelle.executer_form_mutuelle)
    .post('/fiche_mutuelle/:id', way_mutuelle.update_form_mutuelle)
    .post('/delete_mutuelle/:id', way_mutuelle.delete_fiche_mutuelle)

// Routage effectuer sur la page comportant les informations des Maladies
routeur.get('/liste_pathologies', way_maladie.afficher_liste_pathologies)
    //.get('/form_pathologie', way_maladie.afficher_form_pathologie)
    //.get('/fiche_pathologie/:id', way_maladie.afficher_fiche_pathologie)
    .post('/form_pathologie', way_maladie.executer_form_pathologie)
    .post('/fiche_pathologie/:id', way_maladie.update_form_pathologie)
    .post('/delete_pathologie/:id', way_maladie.delete_fiche_pathologie)

// Routage effectuer sur la page comportant les informations des Patients  
routeur.get('/liste_clients', way_patients.afficher_liste_clients)
    //.get('/form_client', way_patients.afficher_form_client)
    //.get('/fiche_client/:id', way_patients.afficher_fiche_client)
    .post('/form_client', way_patients.executer_form_client)
    .post('/fiche_client/:id', way_patients.update_form_client)
    .post('/delete_client/:id', way_patients.delete_fiche_client) 

// Routage effectuer sur la page comportant les informations des Ordonnances
routeur.get('/liste_ordonnances', way_ordonnances.afficher_liste_ordonnances)
    //.get('/form_ordonnance', way_ordonnances.afficher_form_ordonnance)
    //.get('/fiche_ordonnance/:id', way_ordonnances.afficher_fiche_ordonnance)
    .post('/form_ordonnance', way_ordonnances.executer_form_ordonnance)
    .post('/fiche_ordonnances/:id', way_ordonnances.update_form_ordonnance)
    .post('/delete_ordonnances/:id', way_ordonnances.delete_fiche_ordonnance)

// Routage effectuer sur la page comportant les informations des Stocks 
routeur.get('/liste_stocks', way_stocks.afficher_liste_stocks)
    //.get('/form_stock', way_stocks.afficher_form_stock)
    //.get('/fiche_stock/:id', way_stocks.afficher_fiche_stock)
    .post('/form_stock', way_stocks.executer_form_stock)
    .post('/fiche_stock/:id', way_stocks.update_form_stock)
    .post('/delete_stock/:id', way_stocks.delete_fiche_stock)

module.exports = router;