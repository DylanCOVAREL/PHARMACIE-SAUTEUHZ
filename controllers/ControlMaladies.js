const maladie = require("../models/ModelMaladies");
const stock = require("../models/ModelStock");

const formulaireTraitement = async (req, res) => {
  res.render("traitement.ejs", { result: "" });
};

async function ajouterTraitement (req, res) {
  let result = await stock.lireStock(req.body.medicament);
  if (result == "") await stock.ajouterStock(req.body.medicament);

  await maladie.ajouterTraitement(
    req.body.medicament,
    req.body.dosage,
    req.body.duree,
    req.body.quantite,
    req.body.renouvellement,
    req.params.id
  );
  res.render("traitement.ejs", { result: "" });
};

async function lireTraitement (req, res) {
  let result = await maladie.lireTraitement(req.params.id);
  res.render("traitement.ejs", { result: result });
};

async function modifierTraitement (req, res) {
  await maladie.modifierTraitement(req.body.medicament,
    req.body.dosage,
    req.body.duree,
    req.body.quantite,
    req.body.renouvellement,
    req.params.idOrdonnance,
    req.params.idTraitement)
  res.redirect("/views/index.ejs");
};

async function supprimerTraitement(req,res) {
  await maladie.supprimerTraitement(req.params.idTraitement);
  res.redirect("/liste");
};

module.exports = {
  formulaireTraitement,
  ajouterTraitement,
  lireTraitement,
  modifierTraitement,
  supprimerTraitement,
};