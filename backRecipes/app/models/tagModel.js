const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const tag = sequelize.define('tag', {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		about: {
			type: DataTypes.TEXT
		}
	}, {
		freezeTableName: true
	});
};