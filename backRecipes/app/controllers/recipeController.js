const db = require("../models");
const recipe = db.recipe;
const op = db.sequelize.op;
//Most of these method are consided for one user

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Name can not be empty"
		});
	}
	var recipeObj = {
		name: req.body.name,
		source: req.body.source,
		offlinedata: req.body.source
	};
	recipeObj.rate = checkRate(req.body.rate);
	recipe.create(recipeObj).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred while creating recipe record"
		});
	});
};
//no used yet
exports.search = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [op.iLike]: `%${name}%`} } : null;
	recipe.findAll({ where: condition }).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred searching"
		});
	});
};
exports.findAll = (req, res) => {
	recipe.findAll({
		attributes: { exclude: ['offlinedata']}
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "none recipes?"
		});
	});
};
exports.find = (req, res) => {
	const id = req.params.id;
	const recipeObj = {};
	recipe.findByPk(id).then(data => {
		recipeObj.data;
		//Retrive tags froms recipe_tags
		db.sequelize.recipe_tags.findAll({
			where: { recipeid: id },
			include: [{
				model: tag,
			}] 
		}).then(dataTag => {
			recipeObj.dataTag;
			res.send(recipeObj);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Good try, but doesn't work for ternary"
			});
		});
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something happend with this ID"
		});
	});
};
exports.update = (req, res) => {
	const id = req.params.id;
	recipe.update(req.body, {
		where: { id: id}
	}).then(data => {
		console.log(data);
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not update" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred updating"
		});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	recipe.destroy({
		where: {
			id: id
		}
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred deleting"
		});
	});
};
//Removes all entries CASCADE?
exports.deleteAll = (req, res) => {
	recipe.destroy({
		truncate: true
	}).then(data =>{
		res.send(data);
	}).catch (err =>  {
		res.status(500).send({
			message: err.message || "Something bad ocurred deleting all"
		});
	});
	
};


function checkRate (rate) {
	if (!rate) {
		rate = 0;
	}
	return rate;
}
