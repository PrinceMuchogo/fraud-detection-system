import prisma from "@/utils/dbconfig";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = 'admin@org.com';
  const adminPassword = 'password123'; 

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert the admin user to ensure idempotency
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'admin',
      email: adminEmail,
      password: hashedPassword, 
      role: 'admin',
    },
  });

  console.log('Admin account seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding admin account:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
