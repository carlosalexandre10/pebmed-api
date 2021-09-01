import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListaPacienteService from '@modules/prontomed/services/pacienteServices/ListaPacienteService';

class ListaPacienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listaPacienteService = container.resolve(ListaPacienteService);

    const pacientes = await listaPacienteService.execute();

    return response.status(200).json(pacientes);
  }
}

export default ListaPacienteController;
