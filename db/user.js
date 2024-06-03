const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const registerUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   



    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        levels: {
          create: [
            { levelNum: 1, isCompleted: false, achievements: 0 },
            { levelNum: 2, isCompleted: false, achievements: 0 },
            { levelNum: 3, isCompleted: false, achievements: 0 },
            { levelNum: 4, isCompleted: false, achievements: 0 },
            { levelNum: 5, isCompleted: false, achievements: 0 },
            { levelNum: 6, isCompleted: false, achievements: 0 },
            { levelNum: 7, isCompleted: false, achievements: 0 },
            { levelNum: 8, isCompleted: false, achievements: 0 },
          ],
        },
      },
    });
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1w' }
    );
    return { user: { id: newUser.id, username: newUser.username }, token };
  } catch (error) {
    console.log(error);
    throw new Error('User registration failed');
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await prisma.users.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return { user: { id: user.id, username: user.username }, token };
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

module.exports = { registerUser, authenticateUser };