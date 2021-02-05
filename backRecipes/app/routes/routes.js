module.exports = (app) => {
	const recipes = require("../controllers/recipeController.js");
	const notes = require("../controllers/noteController.js");
	const tags = require("../controllers/tagController.js");
	var router = require("express").Router();

	//Missing tag data for create recipe
	router.post("/recipes/", recipes.create);
	router.get("/recipes/", recipes.findAll);
	router.put("/recipes/:id", recipes.update);
	router.get("/recipes/:id", recipes.find);
	router.delete("/recipes/:id", recipes.delete);
	router.delete("/recipes/", recipes.deleteAll);

	router.post("/notes/", notes.create);
	router.put("/notes/:id", notes.update);
	router.delete("/notes/:id", notes.delete);

	router.get("/tags/", tags.findAll);
	router.put("/tags/:id", tags.update);
	router.delete("/tags/:id", tags.delete);
	router.post("/tags/", tags.create);

	//It must not finish with '/'
	app.use("/api", router);
}