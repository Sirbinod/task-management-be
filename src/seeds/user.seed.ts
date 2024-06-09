const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function createDefaultUser() {
  try {
    const defaultUser = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });

    if (!defaultUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.EMAIL_PASSWORD, salt);
      await prisma.user.create({
        data: {
          name: "Admin",
          email: process.env.EMAIL_USERNAME,
          password: hashedPassword,
          role: Role.ADMIN,
        },
      });
      console.log("Default user created successfully.");
    } else {
      console.log("Default user already exists.");
    }
  } catch (error) {
    console.error("Error creating default user:", error);
  }
}
