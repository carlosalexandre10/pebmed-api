import { getRepository, Repository } from 'typeorm';

import { IIncluiPacienteDTO } from '@modules/prontomed/dtos/IPacienteDTO';
import Paciente from '@modules/prontomed/entities/Paciente';

import IPacienteRepository from '../IPacienteRepository';

class PacienteRepository implements IPacienteRepository {
  private repository: Repository<Paciente>;

  constructor() {
    this.repository = getRepository(Paciente);
  }

  criar({
    medico_id,
    nome,
    telefone,
    email,
    dataNascimento,
    sexo,
    altura,
    peso,
  }: IIncluiPacienteDTO): Paciente {
    return this.repository.create({
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    });
  }

  async incluir(paciente: Paciente): Promise<void> {
    await this.repository.save(paciente);
  }

  async listar(): Promise<Paciente[]> {
    const pacientes = await this.repository.find();

    return pacientes;
  }

  async alterar(paciente: Paciente): Promise<void> {
    await this.repository.save(paciente);
  }

  async findById(id: string): Promise<Paciente | null> {
    const paciente = await this.repository.findOne({ id });

    return paciente || null;
  }
}

export default PacienteRepository;
