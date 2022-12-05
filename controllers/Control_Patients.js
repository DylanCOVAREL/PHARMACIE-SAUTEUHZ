var Model_Patients = require('../models/Model_Patients');
module.exports = {
    //afficher la liste des patients avec leurs données
    afficher_liste_patients: function (req, res) {
        Model_Patients.afficher_liste_patients(function (data) {
            res.render('./liste_patients', { contenu: data, titre: "Liste des patients", valid: req.flash('valid'), erreur: req.flash('erreur') });
        });
    },
    //afficher le formulaire d'ajout de patients en recupérant les données invariables (les mutuelles)
    afficher_form_patient: function (req, res) {
        Model_Patients.afficher_form_patient(function (data) {
            res.render('./form_patient', { contenu: data, titre: "Formulaire patient", valid: req.flash('valid'), erreur: req.flash('erreur') })
        });
    },
    //afficher une fiche individuelle sous forme de formulaire pour chaque patient, permettant également de modifier les données
    afficher_fiche_patient: function (req, res) {
        let id = req.params.id;
        Model_Patients.afficher_fiche_patient(id, function (data, data2) {
            res.render('./fiche_patient', { info_patient: data, contenu: data2, titre: "Fiche patient", valid: req.flash('valid'), erreur: req.flash('erreur') })
        });
    },
    //éxécuter le formulaire d'ajout de patients
    executer_form_patient: function (req, res) {
        let patients_nom = req.body.inputNom
        let patients_prenom = req.body.inputPrenom
        let patients_mail = req.body.inputEmail
        let patients_tel = req.body.inputTel
        let patients_sexe = req.body.selectSexe
        let patients_Naissance = req.body.inputDate
        let patients_adresse = req.body.inputAdresse
        let patients_ville = req.body.inputVille
        let patients_cp = req.body.inputCp
        let patients_secu = req.body.inputSecu
        let idMutuelle = req.body.selectMutuelle
        if (patients_nom === "" || patients_prenom === "" || patients_mail === "" || patients_tel === "" || patients_sexe === "" || patients_Naissance === "" || patients_adresse === "" || patients_ville === "" || patients_cp === "" || patients_secu === "" || idMutuelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./form_patient')
        } else {
            //reverse la date de naissance pour la mettre au format mysql
            patients_Naissance = patients_Naissance.split("/").reverse().join("/");
            patients_tel = patients_tel.split(' ').join('')
            patients_secu = patients_secu.split(' ').join('')

            let patientParam = { idMutuelle, patients_secu, patients_nom, patients_prenom, patients_sexe, patients_Naissance, patients_tel, patients_mail, patients_adresse, patients_ville, patients_cp }
            Model_Patients.executer_form_patient(patientParam, function (data) {
                req.flash('valid', 'Ajout de patient terminé');
                res.redirect('./liste_patients')
            })
        }
    },
    //éxécuter le formulaire de modification des données patients
    update_form_patient: function (req, res) {
        let id = req.params.id

        let patients_nom = req.body.inputNom
        let patients_prenom = req.body.inputPrenom
        let patients_mail = req.body.inputEmail
        let patients_tel = req.body.inputTel
        let patients_sexe = req.body.selectSexe
        let patients_Naissance = req.body.inputDate
        let patients_adresse = req.body.inputAdresse
        let patients_ville = req.body.inputVille
        let patients_cp = req.body.inputCp
        let patients_secu = req.body.inputSS
        let idMutuelle = req.body.selectMutuelle

        if (patients_nom === "" || patients_prenom === "" || patients_mail === "" || patients_tel === "" || patients_sexe === "" || patients_Naissance === "" || patients_adresse === "" || patients_ville === "" || patients_cp === "" || patients_secu === "" || idMutuelle === "") {
            req.flash('erreur', 'Remplir tout les champs');
            res.redirect('./../fiche_patient/' + id)
        } else {
            //reverse la date de naissance pour la mettre au format mysql
            patients_Naissance = patients_Naissance.split("/").reverse().join("/");
            patients_tel = patients_tel.split(' ').join('')
            patients_secu = patients_secu.split(' ').join('')

            let patientParam = { idMutuelle, patients_secu, patients_nom, patients_prenom, patients_sexe, patients_Naissance, patients_tel, patients_mail, patients_adresse, patients_ville, patients_cp }

            Model_Patients.update_form_patient([patientParam, id], function (data) {
                req.flash('valid', 'Modification terminé');
                res.redirect('./../liste_patients')
            })
        }
    },
    //supprimer les données patients 
    delete_fiche_patient: function (req, res) {
        id = req.params.id
        Model_Patients.delete_fiche_patient(id, function (data) {
            req.flash('valid', 'Suppression du patient terminé');
            res.redirect('./../liste_patients')
        });
    }
}