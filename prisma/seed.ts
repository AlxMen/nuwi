import { User } from "./data/User";
import { Entities } from "./data/Entitie";
import { PrismaClient } from "@prisma/client";
import { Categories } from "./data/Categories";

const prisma = new PrismaClient();

async function main() {
  try {
    //await prisma.user.createMany({
    //  data: User,
    //});
    await prisma.category.createMany({
      data: Categories
    })
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
  });
