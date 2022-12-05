var Model_Maladies = require('../models/Model_Maladies');
module.exports = {
//afficher la liste des maladies avec leurs données
    afficher_liste_maladies: function (req, res) {
        Model_Maladies.afficher_liste_maladies(function (data) {
            res.render('./liste_maladies', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Les maladies" })
        });
    },
//afficher le formulaire d'ajout de maladies
    afficher_form_maladie: function (req, res) {
        Model_Maladies.afficher_form_maladie(function (data) {
            res.render('./form_maladie', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Formulaire maladie" })
        });
    },
//afficher une fiche individuelle sous forme de formulaire pour chaque Ordonnance, permettant également de modifier les données    
    afficher_fiche_maladie: function (req, res) {
        let id = req.params.id;
        Model_Maladies.afficher_fiche_maladie(id, function (data) {
            res.render('./fiche_maladie', { valid: req.flash('valid'), erreur: req.flash('erreur'), contenu: data, titre: "Fiche maladie" })
        });
    },
//éxécuter le formulaire d'ajout de maladies
    executer_form_maladie: function (req, res) {
        let maladies_libelle = req.body.inputNomMutu
        if (maladies_libelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./form_maladie')
        } else {
            pathoLib = { maladies_libelle }
            Model_Maladies.executer_form_maladie(pathoLib, function (data) {
                req.flash('valid', 'Ajout de maladie terminé');
                res.redirect('./liste_maladies')
            })
        }
    },
//éxécuter le formulaire de modification des données maladies
    update_form_maladie: function (req, res) {
        let id = req.params.id
        let maladies_libelle = req.body.inputNomMutu
        let pathoLib = { maladies_libelle }
        if (maladies_libelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_maladie/' + id)
        } else {
            Model_Maladies.update_form_maladie([pathoLib, id], function (data) {
                req.flash('valid', 'Modification de maladie terminé');
                res.redirect('./../liste_maladies')
            })
        }
    },
//supprimer les données maladies 
    delete_fiche_maladie: function (req, res) {
        id = req.params.id
        Model_Maladies.delete_fiche_maladie(id, function (data) {
            req.flash('valid', 'Supression de maladie terminé');
            res.redirect('./../liste_maladies')
        });
    }
}