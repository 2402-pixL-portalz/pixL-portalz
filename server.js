require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { verifyToken } = require("./auth/authMiddleware.js");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log environment variables
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Body Logger Middleware
app.use((req, _, next) => {
	console.log("<___BODY LOGGER START_____>");
	console.log(req.body);
	console.log("<___BODY LOGGER END_______>");
	next();
});

// Routes
app.use("/api/v1/levels", require("./api/levels.js"));
app.use("/api/v1/auth", require("./auth/auth.js"));

// Protected Route
app.get("/api/v1/protected", verifyToken, (req, res) => {
	res.send("This is a protected route only accessible with a valid token.");
});

// Serve Frontend
for (const path of ["/", "/Register", "/Login"]) {
	app.use(path, express.static("dist"));
}

// Define Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
	console.log("Server running on port", PORT);
});

module.exports = app;
