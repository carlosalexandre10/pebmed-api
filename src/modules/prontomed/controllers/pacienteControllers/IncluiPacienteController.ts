import { Response, Request } from 'express';
import { container } from 'tsyringe';

import IncluiPacienteService from '@modules/prontomed/services/pacienteServices/IncluiPacienteService';

class IncluiPacienteController {
  async handle(request: Request, response: Response): Promise<Response> {
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

    const incluiPacienteService = container.resolve(IncluiPacienteService);

    const paciente = await incluiPacienteService.execute({
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    });

    return response.status(201).json(paciente);
  }
}

export default IncluiPacienteController;
