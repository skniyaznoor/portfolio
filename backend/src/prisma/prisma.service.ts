import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// @ts-ignore
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';


@Injectable()
// @ts-ignore
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const pool = new Pool({
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_DATABASE || 'portfolio',
            user: process.env.DB_USERNAME || 'laraveluser',
            password: process.env.DB_PASSWORD || 'secret123',
        });
        const adapter = new PrismaPg(pool);

        // @ts-ignore
        super({ adapter });
    }

    async onModuleInit() {
        // @ts-ignore
        await this.$connect();
    }

    async onModuleDestroy() {
        // @ts-ignore
        await this.$disconnect();
    }
}
