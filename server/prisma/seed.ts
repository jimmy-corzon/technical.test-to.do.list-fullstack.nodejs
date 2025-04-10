import { PrismaClient, Prisma } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting the seeding process...');

  const users: { data: Prisma.UserCreateInput }[] = [
    {
      data: {
        name: 'Blindariesgos',
        email: 'reto@blindariesgos.com',
        password: 'Reto123',
      },
    },

    {
      data: {
        name: 'Jimmy Corzon',
        email: 'jimmy.a.corzon@gmail.com',
        password: 'Jimmy123',
      },
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(
      user.data.password,
      parseInt(process.env.SALT_ROUNDS ?? '10'),
    );

    const createUser = await prisma.user.upsert({
      where: { email: user.data.email },
      update: {
        ...user.data,
        password: hashedPassword,
      },
      create: {
        ...user.data,
        password: hashedPassword,
      },
    });

    console.log('👤 Created test user:', createUser.email);
  }
}

main()
  .then(async () => {
    console.log('🎉 Seeding completed successfully.');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
