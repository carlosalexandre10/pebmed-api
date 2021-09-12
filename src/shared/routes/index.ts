import { Router } from 'express';

import agendamentoRouter from '@modules/prontomed/routes/agendamento.routes';
import autenticacaoRouter from '@modules/prontomed/routes/autenticacao.routes';
import consultaRouter from '@modules/prontomed/routes/consulta.routes';
import medicoRouter from '@modules/prontomed/routes/medico.routes';
import pacienteRouter from '@modules/prontomed/routes/paciente.routes';

const routes = Router();

routes.use('/v1', autenticacaoRouter);
routes.use('/v1/medicos', medicoRouter);
routes.use('/v1/pacientes', pacienteRouter);
routes.use('/v1/agendamentos', agendamentoRouter);
routes.use('/v1/consultas', consultaRouter);

export default routes;
