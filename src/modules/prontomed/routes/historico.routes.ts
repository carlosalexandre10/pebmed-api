import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const historicoRouter = Router();
historicoRouter.use(ensureAuthenticated);

export default historicoRouter;
