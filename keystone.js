// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");
var handlebars = require("express-handlebars");

const mongoose = require("mongoose");

keystone.init({
	name: "nodejs-cms",
	brand: "nodejs-cms",

	sass: "public",
	static: "public",
	favicon: "public/favicon.ico",
	views: "templates/views",
	"view engine": ".hbs",

	"custom engine": handlebars.create({
		layoutsDir: "templates/views/layouts",
		partialsDir: "templates/views/partials",
		defaultLayout: "default",
		helpers: new require("./templates/views/helpers")(),
		extname: ".hbs",
	}).engine,

	"auto update": true,
	session: true,
	auth: true,
	"user model": "User",
});
keystone.import("models");
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set("routes", require("./routes"));

keystone.set("nav", {
	posts: ["posts", "post-categories"],
	galleries: "galleries",
	users: "users",
});

mongoose.connect(process.env.MONGO_URI);

keystone.start();
