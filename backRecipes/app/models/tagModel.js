const { DataTypes } = require("sequelize");
//Remember id is set by default. It's not necessary to include foreign key description, association with the instante is posible.
module.exports = (sequelize) => {
	const tag = sequelize.define('tag', {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		about: DataTypes.TEXT
	}, {
		freezeTableName: true
	});
	return tag;
};