const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const saltRounds = 10;

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password,saltRounds);
  const newUser = await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  return newUser;
};

const authenticateUser = async (username, password) => {
  const user = await prisma.users.findUnique({
    where: {username},
  });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;

  } else {
    throw new Error('Invalid credentials');
  }
  
};

module.exports = { registerUser, authenticateUser };