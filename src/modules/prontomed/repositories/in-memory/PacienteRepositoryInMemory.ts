import { v4 } from 'uuid';

import { IIncluiPacienteDTO } from '@modules/prontomed/dtos/IPacienteDTO';
import Paciente from '@modules/prontomed/entities/Paciente';

import IPacienteRepository from '../IPacienteRepository';

class PacienteRepositoryInMemory implements IPacienteRepository {
  pacientes: Paciente[] = [];

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
    const paciente = new Paciente();

    Object.assign(paciente, {
      id: v4(),
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    });

    return paciente;
  }

  async incluir(paciente: Paciente): Promise<void> {
    this.pacientes.push(paciente);
  }

  async listar(): Promise<Paciente[]> {
    const { pacientes } = this;

    return pacientes;
  }

  async alterar(paciente: Paciente): Promise<void> {
    console.log(this.pacientes);
    this.pacientes.splice(
      this.pacientes.findIndex(pac => pac.id === paciente.id),
      1,
    );
    console.log(this.pacientes);
    this.pacientes.push(paciente);
    console.log(this.pacientes);
  }

  async findById(id: string): Promise<Paciente | null> {
    const paciente = this.pacientes.find(paciente => paciente.id === id);

    return paciente || null;
  }
}

export default PacienteRepositoryInMemory;
