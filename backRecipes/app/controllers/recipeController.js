const db = require("../models");
const recipe = db.recipe;
const op = db.sequelize.op;
//Most of these method are consided for one user

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Name can not be empty";
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
			message:
				err.message || "Something bad ocurred while creating recipe record"
		});
	});
};
exports.search = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [op.iLike]: `%${name}%`} } : null;
	recipe.findAll({ where: condition }).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500)send({
			message:
			err.message || "Something bad ocurred searching"
		});
	});
};
exports.findAll = (req, res) => {
	const recipes = await recipe.findAll({
		attributes: { exclude: ['offlinedata']}
	});
	res.send(recipes);
};
exports.findOfflineData = (req, res) => {
	const id = req.params.id;
	const recipeObj = await recipe.findByPk(id,
		attributes: ['offlinedata']
	);
	res.send(recipeObj);
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
		res.status(500)send({
			message:
			err.message || "Something bad ocurred updating"
		});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	const data = await recipe.destroy({
		where: {
			id: id
		}
	}).catch( e => {
		res.status(500)send({
			message:
			err.message || "Something bad ocurred deleting"
		});
	});
	res.send(data);
};
//Removes all entries CASCADE?
exports.deleteAll = (req, res) => {
	try {
		const data = await recipe.destroy({
			truncate: true
		});
		res.send(data);
	} catch (e) {
		res.status(500)send({
			message:
			err.message || "Something bad ocurred deleting all"
		});
	}
	
};
//Retrive tags froms recipe_tags
exports.findRecipeTags = (req, res) => {
	const recipeId = req.params.id;
	db.recipe_tags.findAll({
		where: { recipeid: recipeId },
		include: [{
			model: tag,
		}] 
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Good try, but doesn't work for ternary"
		});
	});
};

function checkRate (rate) {
	if (!rate) {
		rate = 0;
	}
	return rate;
}
