import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ExcluiAgendamentoService from '@modules/prontomed/services/agendamentoServices/ExcluiAgendamentoService';

class ExcluiAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const excluiAgendamentoService = container.resolve(
      ExcluiAgendamentoService,
    );

    await excluiAgendamentoService.execute(id);

    return response.status(204).send();
  }
}

export default ExcluiAgendamentoController;
