const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const note = sequelize.define('note', {
		text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		photo: DataTypes.BLOB,
		recipe_id: {
			type: DataTypes.INTEGER,
			references: {
				model: receipe,
				key: 'id'
			}
		}
	},{
		freezeTableName: true
	});
};