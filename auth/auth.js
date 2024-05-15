const express = require('express');
const router = require(`express`).Router();
const { registerUser, authenticateUser } = require('../db/user');

router.get("/test", (req, res) => {
	res.send("TESTING");
});

router.post('/register', async (req, res) => {
	try {
		const user = await registerUser(req.body.username, req.body.password);
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await authenticateUser(req.body.username, req.body.password);
		res.status(200).send(user);
	} catch (error) {
		res.status(401).send({ message: error.message });
	}
});

module.exports = router;
