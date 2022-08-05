import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../routes';
import config from '../env';

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', config.port || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', config.auth.JWT_SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;
