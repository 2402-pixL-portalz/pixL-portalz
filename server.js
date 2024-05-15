require(`dotenv/config`);
const express = require(`express`);
const morgan = require(`morgan`);
const { verifyToken } = require('./auth/authMiddleware.js');
const levelRoutes = require('./api/levels.js');


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
app.use(`/api/v1/auth`, require(`./auth/auth.js`));

app.get('/api/v1/protected', verifyToken, (req, res) => {
	res.send('This is a protected route only accessible with valid token.');
});
// serving front-end for user
for (const path of ["/"]) {
	app.use(path, express.static("dist"));
}

app.use(express.static('dist'));

app.listen(process.env.PORT || 3000, () => {
	console.log("LISTENING ON PORT", process.env.PORT);
});

module.exports = app;
