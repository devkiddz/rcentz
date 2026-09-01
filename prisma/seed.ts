import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function seedOfficialAdmin() {
  const name = getRequiredEnv("SEED_ADMIN_NAME");
  const email = getRequiredEnv("SEED_ADMIN_EMAIL").toLowerCase();
  const password = getRequiredEnv("SEED_ADMIN_PASSWORD");

  if (password.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must contain at least 12 characters.",
    );
  }

  if (password.length > 128) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must not exceed 128 characters.",
    );
  }

  let createdNow = false;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("Creating official Rcentz administrator...");

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    createdNow = true;

    user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(
        "Better Auth created no recoverable administrator user.",
      );
    }
  } else {
    console.log("Official Rcentz administrator already exists.");
  }

  const credentialAccount = await prisma.account.findFirst({
    where: {
      userId: user.id,
      providerId: "credential",
    },
    select: {
      id: true,
    },
  });

  if (!credentialAccount) {
    throw new Error(
      "Administrator exists but has no Better Auth credential account. Password credentials were not modified.",
    );
  }

  const admin = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      emailVerified: true,
    },
  });

  // Better Auth may create a session during initial email/password signup.
  // Remove only that initial seed-created session.
  // Existing administrator sessions are preserved on future seed runs.
  if (createdNow) {
    await prisma.session.deleteMany({
      where: {
        userId: admin.id,
      },
    });
  }

  console.log("Official Rcentz administrator ready:");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    emailVerified: admin.emailVerified,
  });
}

async function main() {
  console.log("Starting Rcentz database seed...");

  await seedOfficialAdmin();

  console.log("Rcentz database seed completed.");
}

main()
  .catch((error) => {
    console.error("Rcentz seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });