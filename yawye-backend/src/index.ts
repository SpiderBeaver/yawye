import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes';
import { createConnection } from 'typeorm';

async function main() {
  const app = express();
  app.use(cors());

  const entitiesPath = path.join(__dirname, 'entities', '**', '*.js');

  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'yawye',
    entities: [entitiesPath],
    synchronize: true,
    logging: true,
  });

  app.use(router);

  app.listen(3001, () => console.log('YAWYE server started. Listening on port 3001.'));
}

main();
