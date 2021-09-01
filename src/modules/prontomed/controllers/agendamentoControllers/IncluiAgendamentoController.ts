import { Response, Request } from 'express';
import { container } from 'tsyringe';

import IncluiAgendamentoService from '@modules/prontomed/services/agendamentoServices/IncluiAgendamentoService';

class IncluiAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { paciente_id, data } = request.body;

    const incluiAgendamentoService = container.resolve(
      IncluiAgendamentoService,
    );

    const paciente = await incluiAgendamentoService.execute({
      paciente_id,
      data,
    });

    return response.status(201).json(paciente);
  }
}

export default IncluiAgendamentoController;
