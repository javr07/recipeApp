const { Model, DataTypes } = require("sequelize");
//Remember id is set by default
module.exports = (sequelize) => {
	const note = sequelize.define('note', {
		text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		photo: DataTypes.BLOB
	},{
		freezeTableName: true
	});
	return note;
};