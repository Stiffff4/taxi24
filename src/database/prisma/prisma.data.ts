import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaData extends PrismaClient {
  constructor(){
    super({
        datasources: {
            db: {
                url : 'postgresql://stiffff:123@localhost:5434/taxi24db?schema=public'
            },
        },
    });
  }
}