import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListaMedicoService from '@modules/prontomed/services/medicoServices/ListaMedicoService';

class ListaMedicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listaMedicoService = container.resolve(ListaMedicoService);

    const medicos = await listaMedicoService.execute();

    return response.status(200).json(medicos);
  }
}

export default ListaMedicoController;
