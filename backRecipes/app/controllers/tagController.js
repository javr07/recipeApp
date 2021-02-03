const db = require("../models");
const tag = db.tag;

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "nameless?"
		});
	}
	const tagObj = {
		name: req.body.name,
		about: req.body.about
	};
	tag.create(tagObj).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong creating tag"
		});
	});
};
exports.findAll = (req, res) => {
	tag.findAll().then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "None tag?"
		});
	});
};	
exports.delete = (req, res) => {
	const id = req.params.id;
	tag.destroy({
		where: { id: id }
	}).then(data => {
		res.send(data);		
	}).cath(err => {
		res.status(500).send({
			message: err.message || "Something went wrong deleting tag" 
		});
	});
};
exports.update = (req, res) => {
	const id = req.params.id;
	tag.update(req.body, {
		where: { id: id }
	}).then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong updating tag"
		});
	});
};