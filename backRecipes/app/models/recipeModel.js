const { DataTypes } = require("sequelize");
//Remember id is set by default
module.exports = (sequelize) => {
	const recipe = sequelize.define('recipe', {
		name: { 
			type: DataTypes.STRING,
			allowNull: false
		},
		source: { 
			type: DataTypes.STRING,
			allowNull: false
		},
		rate: { 
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		offlinedata: DataTypes.TEXT
	}, {
		freezeTableName: true
	}); 
	return recipe;
};