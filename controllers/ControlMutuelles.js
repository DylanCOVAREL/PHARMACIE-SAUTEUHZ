const modelMutuelle = require('../models/modelMutuelle');

const controllerMutuelle = {
	async affichageMutuelle(req, res){
		try {
			const data = await modelMutuelle.Mutuelles.afficherMutuelles()
			if(data){
				res.render("mutuelle", {dataMutuelle: data})
			}else{
				res.render("mutuelle", {dataMutuelle: {} })
			}
		} catch (error) {
			console.log(error)
		}
	},

	async affichageUneMutuelle(req, res){
		try {
			const data = await modelMutuelle.Mutuelles.afficherUneMutuelle(req)
			if(data){
				res.render("modifierMutuelle", {dataMutuelle: data})
			}else{
				res.render("mutuelle", {dataMutuelle: {} })
			}
		} catch (error) {
			console.log(error)
		}
	},

	redirectionMutuelle(req, res){
		try {
			res.render("ajouterMutuelle")
		} catch (error) {
			console.log(error)
		}
	},

	async ajouterMutuelle(req, res){
		try {
			const data = await modelMutuelle.Mutuelles.ajouterMutuelle(req)
			if(data){
				res.redirect("/mutuelle");
			}else{
				//console.log("champs incorrects")
				res.render("ajouterMutuelle");
			}

		} catch (error) {
			console.log(error)
		}
	},

	async supprimerMutuelle(req, res){
		try {
			const data = await modelMutuelle.Mutuelles.supprimerMutuelle(req)
			if(data){
				res.redirect("/mutuelle");
			}else{
				console.log("erreur lors de l'ajout");
				res.redirect("/mutuelle");
			}
		} catch (error) {
			console.log(error)
		}
	},

	async modifierMutuelle(req, res){
		try {
			const data = await modelMutuelle.Mutuelles.modifierMutuelle(req)
			if(data){
				res.redirect("/mutuelle");
			}else{
				console.log("champs incorrects")
				res.redirect("/mutuelle/modifierMutuelle/" + req.params.id);
			}

		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = ControlMutuelle