import { Response, Request } from 'express';
import { container } from 'tsyringe';

import IncluiAnotacaoConsultaService from '@modules/prontomed/services/consultaServices/IncluiAnotacaoConsultaService';

class IncluiAnotacaoConsultaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { anotacao } = request.body;

    const incluiAnotacaoConsultaService = container.resolve(
      IncluiAnotacaoConsultaService,
    );

    const agendamento = await incluiAnotacaoConsultaService.execute({
      id,
      anotacao,
    });

    return response.status(200).json(agendamento);
  }
}

export default IncluiAnotacaoConsultaController;
