require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./app/doc/definitions.json";

const app = express();

var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//DB
const db = require("./app/models/index.cjs");
db.sequelizeObj.sync();

//Swagger
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// simple route
app.get("/", (req, res) => {
	res.json({message: "API for GetMYRecipe app"});
});
require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`This server is running on port ${PORT}`);
});
