import { prisma } from "../config/db";


async function main() {
  const instituteId = process.env.INSTITUTE_ID!;

  const students = Array.from({ length: 100000 }, (_, i) => ({
    name: `Student ${i + 1}`,
    instituteId,
  }));

  console.log("Seeding started... This may take a while for 100,000 records..");

  await prisma.student.createMany({
    data: students,
    skipDuplicates: true, 
  });

  console.log("Seeding completed 10000 records  ! ");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });