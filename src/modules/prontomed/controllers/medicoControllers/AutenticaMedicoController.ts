import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AutenticaMedicoService from '@modules/prontomed/services/medicoServices/AutenticaMedicoService';

class AutenticaMedicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { crm, senha } = request.body;

    const autenticaMedicoService = container.resolve(AutenticaMedicoService);

    const medico = await autenticaMedicoService.execute({ crm, senha });

    return response.status(200).json(medico);
  }
}

export default AutenticaMedicoController;
