import { getErrorMessage } from '@jobhunt-microservices/jobhunt-shared';
import { config } from '@review/config';
import { SERVICE_NAME } from '@review/constants';
import { logger } from '@review/utils/logger.util';
import client, { Channel, Connection } from 'amqplib';

const log = logger('reviewQueueConnection', 'debug');

export const createConnection = async (): Promise<Channel | undefined> => {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info(SERVICE_NAME + ` connected to queue successfully`);
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', SERVICE_NAME + ' createConnection() method:', getErrorMessage(error));
    return undefined;
  }
};

export const closeConnection = async (channel: Channel, connection: Connection) => {
  process.once('SIGNINT', async () => {
    await channel.close();
    await connection.close();
  });
};
