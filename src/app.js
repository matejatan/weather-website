const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { error } = require("console");

const app = express();

//Define paths for Express confg
app.use(express.static(path.join(__dirname, "../public")));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// app.get("/help", (req, res) => {
// 	res.sendFile(path.join(__dirname, "../public/help.html"));
// });
// app.get("/about", (req, res) => {
// 	res.sendFile(path.join(__dirname, "../public/about.html"));
// });

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Matej",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Atano",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, place_name } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, forcastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forcastData,
					location: place_name,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		info: "this is help site",
		title: "Help",
		name: "Matej",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Matej",
		errorMsg: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Matej",
		errorMsg: "Page not found",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
