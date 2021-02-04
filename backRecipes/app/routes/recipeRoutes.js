module.exports = (app) => {
	const recipes = require("../controllers/recipeController.js");
	var router = require("express").Router();

	router.post("/", recipes.create);
	router.get("/", recipes.findAll);
	router.put("/:id", recipes.update);
	router.get("/:id", recipes.find);
	router.delete("/:id", recipes.delete);
	router.delete("/", recipes.deleteAll);

	app.use("/api/recipes", router);
}