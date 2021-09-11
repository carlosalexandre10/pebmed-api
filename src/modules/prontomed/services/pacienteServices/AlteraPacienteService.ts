import { inject, injectable } from 'tsyringe';

import { IAlteraPacienteDTO } from '@modules/prontomed/dtos/IPacienteDTO';
import Paciente from '@modules/prontomed/entities/Paciente';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

@injectable()
class AlteraPacienteService {
  constructor(
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({
    id,
    medico_id,
    nome,
    telefone,
    email,
    dataNascimento,
    sexo,
    altura,
    peso,
  }: IAlteraPacienteDTO): Promise<Paciente> {
    const paciente = new Paciente();
    Object.assign(paciente, {
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
    const error = await validarCampos(paciente);

    if (error) {
      throw new AppError(error);
    }

    const medicoExiste = await this.medicoRepository.findById(medico_id);

    if (!medicoExiste) {
      throw new AppError('Médico não existe.');
    }

    const pacienteExiste = await this.pacienteRepository.findById(id);

    if (!pacienteExiste) {
      throw new AppError('Paciente não existe.');
    }

    Object.assign(pacienteExiste, {
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

    await this.pacienteRepository.alterar(pacienteExiste);

    return pacienteExiste;
  }
}

export default AlteraPacienteService;
