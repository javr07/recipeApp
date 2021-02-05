const db = require("../models");
const note = db.note;

exports.create = (req, res) => {
	if (!req.body.text) {
		res.status(400).send({
			message: "Blank note?"
		});
	}
	const noteObj = {
		text: req.body.text,
		photo: req.body.photo,
		recipeId: req.body.recipeId
	};
	note.create(noteObj).then(data => {
		res.send(data);
	}).catch (err => {
		res.status(500).send({
			message: err.message || "Something wrong happend creating note"
		});
	});
};
exports.update = (req, res) => {
	const id = req.params.id;
	note.update(req.body, {
		where: { id: id }
	}).then(data => {
		console.log(data);
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not update" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong updating note"
		});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	note.destroy({
		where: { id: id }
	}).then(data =>{
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not delete" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong deleting note"
		})
	});
};