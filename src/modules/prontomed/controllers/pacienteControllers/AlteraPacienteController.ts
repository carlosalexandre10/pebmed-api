import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AlteraPacienteService from '@modules/prontomed/services/pacienteServices/AlteraPacienteService';

class AlteraPacienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    } = request.body;

    const alteraPacienteService = container.resolve(AlteraPacienteService);

    const paciente = await alteraPacienteService.execute({
      id,
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    });

    return response.status(200).json(paciente);
  }
}

export default AlteraPacienteController;
