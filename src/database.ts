import { getErrorMessage } from '@jobhunt-microservices/jobhunt-shared';
import { config } from '@review/config';
import { SERVICE_NAME } from '@review/constants';
import { logger } from '@review/utils/logger.util';
import mongoose from 'mongoose';

const log = logger('reviewDatabaseServer', 'debug');

export class Database {
  async connection() {
    try {
      await mongoose.connect(`${config.DATABASE_URL}`);
      log.info(SERVICE_NAME + ' Mongodb database connection has been established successfully');
    } catch (error) {
      log.error(SERVICE_NAME + ' unable to connect to db');
      log.log('error', SERVICE_NAME + ` connection() method:`, getErrorMessage(error));
    }
  }
}

export const database = new Database();
