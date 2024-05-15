const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password,saltRounds);
  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
      levels: {
        create: [
          {  isCompleted: false, achievements: 0},
          {  isCompleted: false, achievements: 0},
          {  isCompleted: false, achievements: 0},

        ]
      }
    },
  });
  const token = jwt.sign(
    { userId: newUser.id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1w'}
  );
  return { user: { id: newUser.id, username: newUser.username }, token };
};

const authenticateUser = async (username, password) => {
  const user = await prisma.users.findUnique({
    where: {username},
  });
  if (user && await bcrypt.compare(password, user.password)) {

    const token = jwt.sign(
      { userId: user.id, username: user.username}, 
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
    );
    return { user: { id: user.id, username: user.username }, token };

  } else {
    throw new Error('Invalid credentials');
  }
  
};

module.exports = { registerUser, authenticateUser };