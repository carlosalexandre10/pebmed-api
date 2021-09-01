import { inject, injectable } from 'tsyringe';

import Paciente from '@modules/prontomed/entities/Paciente';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';

@injectable()
class ListaPacienteService {
  constructor(
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
  ) {}

  async execute(): Promise<Paciente[]> {
    const pacientes = await this.pacienteRepository.listar();

    return pacientes;
  }
}

export default ListaPacienteService;
