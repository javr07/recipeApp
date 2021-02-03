module.exports = {
	HOST: process.env.DB_HOST,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASS,
	DB: process.env.DB_NAME,
	Ddialect: "postgres",
	pool: {
		acquire: 30000,
		idle: 10000
	},
	typeValidation: true
};