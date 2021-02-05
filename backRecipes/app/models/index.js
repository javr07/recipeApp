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
//Probably turn off timestamps, these are on by default
db.recipe = require("./recipeModel.js")(sequelizeObj);
db.tag = require("./tagModel.js")(sequelizeObj);
db.note = require("./noteModel.js")(sequelizeObj);

db.recipe.hasMany(db.note, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
db.note.belongsTo(db.recipe);
//Define a model for junction table
db.recipeTags = sequelizeObj.define('recipeTags', {}, { timestamps: false });
//For m:n relations cascade is default. Set recipeTags as junction table
db.recipe.belongsToMany(db.tag, { through: 'recipeTags' });
db.tag.belongsToMany(db.recipe, { through: 'recipeTags' });

module.exports = db;