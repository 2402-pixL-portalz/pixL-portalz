const router = require(`express`).Router();

router.get("/test", (req, res) => {
	res.send("TESTING");
});

module.exports = router;
