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
		receipe_id: req.body.receipe_id
	};
	note.create(noteObj).then(data => {
		res.send(data);
	}).catch (err => {
		res.status(500).send({
			message: err.message || "Something wrong happend creating note"
		});
	});
};
//Retrieve notes by receipe
exports.find = (req, res) => {
	const receipe_id = req.params.receipe_id;
	const notes = await note.findAll({
		where: {
			receipe_id: receipe_id
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something wrong getting notes"
		});
	});
	res.send(notes);
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
		console.log(data);
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong deleting note"
		})
	});
};