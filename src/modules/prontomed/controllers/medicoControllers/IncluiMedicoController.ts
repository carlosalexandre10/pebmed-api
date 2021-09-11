import { Response, Request } from 'express';
import { container } from 'tsyringe';

import IncluiMedicoService from '@modules/prontomed/services/medicoServices/IncluiMedicoService';

class IncluiMedicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, crm, senha } = request.body;

    const incluiMedicoService = container.resolve(IncluiMedicoService);

    const medico = await incluiMedicoService.execute({ nome, crm, senha });

    return response.status(201).json(medico);
  }
}

export default IncluiMedicoController;
