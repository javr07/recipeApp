module.exports = (app) => {
	const recipes = require("../controllers/recipeController.js");
	const notes = require("../controllers/noteController.js");
	const tags = require("../controllers/tagController.js");
	var router = require("express").Router();

	//Missing tag data for create recipe
	router.post("/recipe/", recipes.create);
	router.get("/getRecipes/", recipes.findAll);
	router.put("/recipe/:id", recipes.update);
	router.get("/getRecipe/:id", recipes.find);
	router.get("/getRecipeData/:id", recipes.findData);
	router.delete("/deleteRecipes/:id", recipes.delete);
	router.delete("/deleteRecipes/", recipes.deleteAll);

	router.post("/note/", notes.create);
	router.put("/note/:id", notes.update);
	router.delete("/note/:id", notes.delete);

	router.get("/tag/", tags.findAll);
	router.put("/tag/:id", tags.update);
	router.delete("/tag/:id", tags.delete);
	router.post("/tag/", tags.create);

	//It must not finish with '/'
	app.use("/api", router);
}