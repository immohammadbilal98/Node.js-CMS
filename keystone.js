// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");
var handlebars = require("express-handlebars");

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	name: "Eros Group",
	brand: "Eros Group",

	sass: "public",
	static: "public",
	favicon: "public/favicon.ico",
	views: "templates/views",
	"view engine": ".hbs",
	"cloudinary config": process.env.CLOUDINARY_URL, //CLOUDINARY.
	"cookie secret": process.env.COOKIE_SECRET, //COOKIE
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

// Load your project's Models
keystone.import("models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set("routes", require("./routes"));

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
	posts: ["posts", "post-categories"],
	galleries: "galleries",
	enquiries: "enquiries",
	users: "users",
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();

//CLOUD SERVER DATABASE
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

//

// var cookieSession = require("cookie-session");

// keystone.session(
// 	cookieSession({
// 		name: "session",
// 		keys: [process.env.COOKIE_SECRET],

// 		// Cookie Options
// 		maxAge: 24 * 60 * 60 * 1000, // 24 hours
// 	})
// );
const keystone = new Keystone({
	adapter: new Adapter(adapterConfig),
	secureCookies: true,
	sessionStore: new MongoStore({ url: process.env.MONGO_URI }),
	cookieSecret: process.env.COOKIE_SECRET,
	// cookie: {
	//   secure: false,
	//   maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
	//   sameSite: false,
	// },
});

//keystone.set('cookie secret', '----change-me-to-something-secret----');
