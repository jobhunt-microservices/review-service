import { BASE_PATH } from '@review/constants/path';
import { healthRoutes } from '@review/routes/health.route';
import { Application } from 'express';

const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, healthRoutes.routes());
};

export { appRoutes };
