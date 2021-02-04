const dbConfig = require("../config/dbConfig.js");
const sequelize = require("sequelize");

const sequelizeObj = new sequelize(process.env.DB_NAME, 
									process.env.DB_USER, 
									process.env.DB_PASS, {
									host: process.env.DB_HOST,
									dialect: "postgres",
									typeValidation: true 
									});

const db = {};

db.sequelize = sequelize;
db.sequelizeObj = sequelizeObj;

db.recipe = require("./recipeModel.js")(sequelizeObj);
db.tag = require("./tagModel.js")(sequelizeObj);
db.note = require("./noteModel.js")(sequelizeObj);

db.recipe.hasMany(db.note, { foreignKey: 'recipe_id', onDelete: 'CASCADE' });
db.note.belongsTo(db.recipe);
db.recipe.belongsToMany(db.tag, { through: 'recipe_tags', onDelete: 'CASCADE' });
db.tag.belongsToMany(db.recipe, { through: 'recipe_tags', onDelete: 'CASCADE' });

module.exports = db;