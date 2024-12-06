const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.cat.createMany({
    data: [
      { name: "Maew meo 1", color: "white" },
      { name: "Maew maew 2", color: "brown" },
      { name: "My lucky cat", color: "red" },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });