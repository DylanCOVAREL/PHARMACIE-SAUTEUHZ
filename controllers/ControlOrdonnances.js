// Utilisation des modèles ordonnance,traitement et patient
const ordonnanceDB = require("../models/ordonnanceModels");
const traitementDB = require('../models/traitementModels');
const patientDB = require("../models/patientModels");
// Utilisation du module pdfkit
const PDFDocument = require("pdfkit");
// Affiche le formulaire pour modifier les ordonnances
async function formulaireOrdonnance (req,res) {
  // Récupère les ordonnances existantes
  let result = await ordonnanceDB.formulaireOrdonnance(req.params.id);
  res.render("traitement.ejs", {result: result})
}
// Affiche les ordonnances
async function afficherOrdonnance(req, res) {
  // Vérifie si l'ordonnance existe
  let result = await ordonnanceDB.afficherOrdonnance(req.params.id);
  if (result != "") {
    // Affiche un message d'erreur si il n'y a aucun traitement dans l'ordonnance
    res.render("informations.ejs", { result: "" });
  }
}
// Ajouterl'ordonnance
async function ajouterOrdonnance(req, res) {
  // Créer une ordonnance avec les informations du formulaire
  await ordonnanceDB.ajouterOrdonnance(
    req.body.date,
    req.body.prenom,
    req.body.nom,
    req.body.maladie,
    req.params.id
  );
  // Redirige vers la page info du patient
  res.redirect(`/patient/${req.params.id}`);
}

async function modifierOrdonnance (req, res) {
  await ordonnanceDB.modifierOrdonnance(
    req.body.date,
    req.body.nomMedecin,
    req.body.prenomMedecin,
    req.body.maladie,
    req.params.id
  );
  res.redirect(`/liste`);
};

async function supprimerPatient(req, res) {
  let ordonnance = await patientDB.verifierOrdonnance(req.params.id);
  if (ordonnance != "") {
    let traitement = await patientDB.verifierTraitement(ordonnance[0].id);
    if (traitement != "") {
      await traitementDB.supprimerTraitement(traitement[0].id);
      await ordonnanceDB.supprimerOrdonnance(ordonnance[0].id);
    }
  }
  await patientDB.supprimerPatient(req.params.id);
  res.redirect("/views/liste.ejs");
}

async function supprimerOrdonnance (req, res) {
  let traitement = await patientDB.verifierTraitement(req.params.id);
  if (traitement != "") {
    for (let i = 0; i < traitement.length; i++) {
      await traitementDB.supprimerTraitement(traitement[i].id);
    }
  }
  await ordonnanceDB.supprimerOrdonnance(req.params.id);
  res.redirect("/liste");
};
// Exporte les fonctions
module.exports = {
  formulaireOrdonnance,
  afficherOrdonnance,
  ajouterOrdonnance,
  modifierOrdonnance,
  supprimerOrdonnance,
};