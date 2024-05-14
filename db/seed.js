require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const syncAndSeed = async () => {
	console.clear();
	console.log(`\nSTARTING TO SEED...\n`);
	console.log(`\nSTARTING TO SEED USERS...`);

	try {
		await prisma.users.create({
			data: {
				username: "test",
				password: await bcrypt.hash("test", 10)
			}
		});

		console.log(`\nTEST USER SEEDED!`);

		for (let i = 1; i <= process.env.NUM_OF_SEED_USERS - 1; i++) {
			console.log(`SEEDED USER #${i + 1}`);
			await prisma.users.create({
				data: {
					username: faker.internet.userName(),
					password: await bcrypt.hash(faker.internet.password(), 10)
				}
			});
		}

		console.log(`\nUSERS SEEDED!`);
		console.log(`\n\nSTARTING TO SEED LEVELS...\n`);

		for (let i = 1; i <= process.env.NUM_OF_SEED_USERS; i++) {
			const howManyLevelsAreCompleted = Math.floor(Math.random() * process.env.NUM_OF_SEED_LEVELS + 1);

			for (let j = 0; j < process.env.NUM_OF_SEED_LEVELS; j++) {
				await prisma.levels.create({
					data: {
						isCompleted: Math.round(Math.random()) <= 0.5,
						achievements: howManyLevelsAreCompleted,
						userId: i
					}
				});
			}

			console.log(`SEEDED LEVELS FOR USER #${i}`);
		}

		console.log(`\n\nFINISHED SEEDING!!!!!`);

		await prisma.$disconnect();
	} catch (error) {
		await prisma.$disconnect();
		throw error;
	}
};

syncAndSeed();
