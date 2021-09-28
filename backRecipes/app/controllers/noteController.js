import { note as _note } from "../models/index.cjs";
const note = _note;

export function create(req, res) {
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
			message: err.message || "Something wrong happened creating note"
		});
	});
}
export function update(req, res) {
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
}
const _delete = (req, res) => {
	const id = req.params.id;
	note.destroy({
		where: { id: id }
	}).then(data => {
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not delete" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong deleting note"
		});
	});
};
export { _delete as delete };