import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import adminAuthRouter from '../../features/admin/auth/admin-auth.route';
import authRouter from '../../features/auth/auth.route';
import venueRouter from '../../features/venue/venue.route';
import handleError from '../error/handle-error';

const swaggerDef = require('../../../swaggerDef');

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  /**
   * @description Forwards any requests to the / URI to auth Router
   * @constructs
   */
  app.use('/v1/auth', authRouter);

  app.use('/v1/venues', venueRouter);

  app.use('/admin/auth', adminAuthRouter);

  /**
   * @description
   *  If swagger.json file exists in root folder, shows swagger api description
   *  else send commands, how to get swagger.json file
   * @constructs
   */
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../src/**/**/*.ts')],
      }),
    ),
  );

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
  app.use((_req, res) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);

  // custom errors
  app.use(handleError);
}
