const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to fetch all levels for a specific user
const getAllLevels = async (userId) => {
  try {
    const levels = await prisma.levels.findMany({
      where: { userId },
    });
    return levels;
  } catch (error) {
    throw new Error('Failed to fetch levels');
  }
};

// Function to update level completion status
const updateLevelCompletion = async (level, isCompleted) => {
  try {
    await prisma.levels.update({
      where: { levelNum: level },
      data: { isCompleted },
    });
    return { message: 'Level completion status updated' };
  } catch (error) {
    throw new Error('Failed to update level completion status');
  }
};

const getLevelByLevelId = async (levelNum, userId) => {

  const level = await prisma.levels.findFirst({
    where: {
      userId,
      levelNum,
    },
  });
  return level.isCompleted;
}

module.exports = { getAllLevels, updateLevelCompletion, getLevelByLevelId };