import { Response, Request } from 'express';
import { container } from 'tsyringe';

import IncluiConsultaService from '@modules/prontomed/services/consultaServices/IncluiConsultaService';

class IncluiConsultaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { paciente_id, data, anotacao } = request.body;

    const incluiConsultaService = container.resolve(IncluiConsultaService);

    const paciente = await incluiConsultaService.execute({
      paciente_id,
      data,
      anotacao,
    });

    return response.status(201).json(paciente);
  }
}

export default IncluiConsultaController;
