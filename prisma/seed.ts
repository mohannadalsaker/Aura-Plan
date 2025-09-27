import { Permissions, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const allPermissions = Object.values(Permissions) as Permissions[];
  await prisma.role.createMany({
    data: [
      { name: 'ADMIN', permissions: allPermissions },
      { name: 'MANAGER' },
      { name: 'EMPLOYEE' },
    ],
    skipDuplicates: true,
  });

  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
  });

  if (!adminRole) {
    throw new Error('ADMIN role not found after seeding');
  }

  const hashed = await bcrypt.hash('StrongAdminPass123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      username: 'admin',
      password: hashed,
      role_id: adminRole.id,
      last_login: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
