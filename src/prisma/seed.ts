import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a sample user
  const category = await prisma.category.createMany({
    data: [
        {
            title: 'Functionality',
        },
        {
            title: 'Bug',
        },
        {
            title: 'UI',
        },
    ],
  });
  
  const status = await prisma.status.createMany({
    data: [
        {
            title: 'Open',
        },
        {
            title: 'In Progress',
        },
        {
            title: 'Closed',
        },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
