-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "achievements" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
