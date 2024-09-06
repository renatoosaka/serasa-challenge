import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASS}`,
  database: `${process.env.DATABASE_NAME}`,
  synchronize: process.env.DATABASE_SYNC === 'true',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['src/migrations/*{.ts,.js}'],
  // autoLoadEntities: true,
};

export const typeorm = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
