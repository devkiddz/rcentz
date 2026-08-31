import { prisma } from "../lib/prisma";

async function main() {
  // Real Rcentz seed data will be added deliberately in the next step.
  // Keep this file idempotent: prefer upsert() for canonical seed records.
  console.log("Rcentz seed foundation ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
