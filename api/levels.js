const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../auth/authMiddleware');

// Get all levels
router.get('/all', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const levels = await prisma.levels.findMany({
      where: { userId: userId }
    });
    res.status(200).json(levels); // Return levels as JSON with status 200
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Failed to fetch levels' });
  }
});

// Get next level
router.get('/next', verifyToken, async (req, res) => {
  try {
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
      res.status(200).json(nextLevel); // Return next level as JSON with status 200
    } else {
      res.status(404).json({ message: "No more levels available" });
    }
  } catch (error) {
    console.error('Error fetching next level:', error);
    res.status(500).json({ error: 'Failed to fetch next level' });
  }
});

// Complete level
router.post('/complete', verifyToken, async (req, res) => {
  const { levelId } = req.body;
  const userId = req.user.userId;

  try {
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
      res.status(200).json({ message: "Level completed!" }); // Return success message as JSON with status 200
    } else {
      res.status(400).json({ message: "Could not complete level" });
    }
  } catch (error) {
    console.error('Error completing level:', error);
    res.status(500).json({ error: 'Failed to complete level' });
  }
});

module.exports = router;