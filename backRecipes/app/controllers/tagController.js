import { tag as _tag } from "../models/index.cjs";
const tag = _tag;

export function create(req, res) {
	if (!req.body.name) {
		res.status(400).send({
			message: "nameless?"
		});
	}
	const tagObj = {
		name: req.body.name,
		about: req.body.about
	};
	tag.create(tagObj).then(tag => {
		res.send(tag);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong creating tag"
		});
	});
}
export function findAll(req, res) {
	tag.findAll().then(tags => {
		res.send(tags);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "None tag?"
		});
	});
}	
const _delete = (req, res) => {
	const id = req.params.id;
	tag.destroy({
		where: { id: id }
	}).then(data => {
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not delete" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong deleting tag"
		});
	});
};
export { _delete as delete };
export function update(req, res) {
	const id = req.params.id;
	tag.update(req.body, {
		where: { id: id }
	}).then(data => {
		if (data == 1) {
			res.send({ message: "OK" });
		} else {
			res.send({ message: "Could not update" });
		}
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Something went wrong updating tag"
		});
	});
}