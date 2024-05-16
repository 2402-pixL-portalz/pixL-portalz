const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../auth/authMiddleware');

router.get('/all', verifyToken, async (req, res) => {
	const userId = req.user.userId;
	const levels = await prisma.levels.findMany({
		where: { userId: userId}
		
	});
	res.json(levels);
})

router.get('/next', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const nextLevel = await prisma.levels.findFirst({
    where: {
      userId: userId,
      isCompleted: false 
    },
    orderBy: {
      id: 'asc'
    }
  });
  if (nextLevel) {
    res.json(nextLevel);
  } else {
    res.status(404).json({ message: "No more levels available"});
  }
});


router.post('/complete', verifyToken, async (req, res) => {
  const { levelId } = req.body;
  const userId =  req.user.userId;

  const updateLevel = await prisma.levels.updateMany({
    where: {
      id: levelId,
      userId: userId,
      isCompleted: false
    },
		data: {
			isCompleted: true
		}
  });

  if (updateLevel.count > 0) {
    res.json({ message: "Level completed!" });
  } else {
    res.status(400).json({message: "could not complete level"});
  }
});

module.exports = router;
