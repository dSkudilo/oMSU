import { BadRequestException } from '@nestjs/common';

import { Prisma, PrismaClient } from '../../../prisma/generated';

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000,
    timeout: 10000,
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});

async function main() {
  try {
    await prisma.role.createMany({
      data: [
        { name: 'Администратор', key: 'admin' },
        { name: 'Учитель', key: 'teacher' },
        { name: 'Ученик', key: 'student' },
      ],
    });
  } catch {
    throw new BadRequestException('Ошибка при заполнении базы данных');
  } finally {
    await prisma.$disconnect();
  }
}

main();
