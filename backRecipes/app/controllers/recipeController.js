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
	var tags, notes = [{}];
	recipeObj.rate = checkRate(req.body.rate);
	recipe.create(recipeObj).then(dataRecipe => {
		//receive text JSON 
		tags = JSON.parse(req.body.tags);
		notes = JSON.parse(req.body.notes);
		//save and add relations (for each entity)
		saveNotes(notes, dataRecipe);
		addTags(tags, dataRecipe);
		res.send(dataRecipe);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred while creating recipe record"
		});
	});
};
function saveNotes(notes, dataRecipe){
	for (var i = 0; i < notes.length; i++) {
		db.note.create(notes[i]).then( note => {
			note.setRecipe(dataRecipe).then( check => {
			});
		});
	}
};
function addTags(tags, dataRecipe){
	for (var i = 0; i < tags.length; i++) {
		db.tag.findByPk(tags[i].id).then( tag => {
			tag.setRecipes(dataRecipe);
		});
	}
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
	recipe.findByPk(id).then(recipeData => {
		recipeObj.recipe = recipeData;
		//This is the short way to get tags and notes. However, it must be a promise inside a promise inside a promise.
		recipeData.getNotes().then(notes => {
			recipeObj.notes = notes;
			recipeData.getTags().then(tags => {
				recipeObj.tags = tags;
				res.send(recipeObj);	
			});
		});
		//This is the long way to retrieve tags and notes
		/*
		db.tag.findAll({
			where: { id: id },
			include: db.recipe
		}).then(tagData => {
			recipeObj.tag = tagData;
			//Retrieve notes associated
			db.note.findAll({
				where: {
					recipeId: id
				}
			}).then(noteData => {
				recipeObj.note = noteData;
				res.send(recipeObj);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Something wrong getting notes"
				});
			});
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Good try, but doesn't work for junction table"
			});
		});
		*/
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something happened with this ID"
		});
	});
};
exports.update = (req, res) => {
	const id = req.params.id;
	recipe.update(req.body, {
		where: { id: id}
	}).then(data => {
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
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not delete" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something bad ocurred deleting"
		});
	});
};
exports.deleteAll = (req, res) => {
	recipe.destroy({
		where: {},
		truncate: false
	}).then(data =>{
		res.send({ message: `${data} recipes deleted`});
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
