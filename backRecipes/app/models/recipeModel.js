const { DataTypes } = require("sequelize");

module.exports = (sequelize, sequelizeObj) => {
	const recipe = sequelize.define("recipe", {
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
		offlinedata: type: DataTypes.TEXT
	}, {
		freezeTableName: true
	}); 
};