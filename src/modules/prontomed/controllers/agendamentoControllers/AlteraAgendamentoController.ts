import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AlteraAgendamentoService from '@modules/prontomed/services/agendamentoServices/AlteraAgendamentoService';

class AlteraAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { paciente_id, data } = request.body;

    const alteraAgendamentoService = container.resolve(
      AlteraAgendamentoService,
    );

    const agendamento = await alteraAgendamentoService.execute({
      id,
      paciente_id,
      data,
    });

    return response.status(200).json(agendamento);
  }
}

export default AlteraAgendamentoController;
