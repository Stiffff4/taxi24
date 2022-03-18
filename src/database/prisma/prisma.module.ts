import { Module } from '@nestjs/common';
import { PrismaData } from './prisma.data';

@Module({
  imports: [

  ],
  controllers: [],
  providers: [PrismaData],
  exports: [PrismaData]
})
export class PrismaModule {}