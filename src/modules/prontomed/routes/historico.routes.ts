import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

const historicoRouter = Router();
historicoRouter.use(ensureAuthenticated);

export default historicoRouter;
