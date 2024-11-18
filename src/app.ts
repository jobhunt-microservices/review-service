import { config } from '@review/config';
import { database } from '@review/database';
import { redisConnect } from '@review/redis/connection';
import { UsersServer } from '@review/server';
import express, { Express } from 'express';

class Application {
  public initialize() {
    config.cloudinaryConfig();
    database.connection();

    const app: Express = express();
    const server = new UsersServer(app);

    server.start();

    redisConnect();
  }
}

const application = new Application();
application.initialize();
