import { Permissions, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const allPermissions = Object.values(Permissions) as Permissions[];

  let adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
  });

  if (!adminRole)
    adminRole = await prisma.role.create({
      data: { name: 'ADMIN', permissions: allPermissions },
    });

  // if (!adminRole) {
  //   throw new Error('ADMIN role not found after seeding');
  // }

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
      is_system: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
