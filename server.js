require(`dotenv/config`);
const express = require(`express`);
const morgan = require(`morgan`);

const app = express();

// various middleware

app.use(morgan(`dev`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
	console.log("<___BODY LOGGER START_____>");
	console.log(req.body);
	console.log("<___BODY LOGGER END_______>");
	next();
});

// route to api
app.use(`/api/v1/levels`, require(`./api/levels.js`));

// route to authentication
app.use(`/auth/v1/auth`, require(`./auth/auth.js`));

// serving front-end for user
for (const path of ["/"]) {
	app.use(path, express.static("dist"));
}

app.listen(process.env.PORT || 3000, () => {
	console.log("LISTENING ON PORT", process.env.PORT);
});

module.exports = app;
