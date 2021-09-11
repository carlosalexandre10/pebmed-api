import { inject, injectable } from 'tsyringe';

import { IIncluiPacienteDTO } from '@modules/prontomed/dtos/IPacienteDTO';
import Paciente from '@modules/prontomed/entities/Paciente';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

@injectable()
class IncluiPacienteService {
  constructor(
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({
    medico_id,
    nome,
    telefone,
    email,
    dataNascimento,
    sexo,
    altura,
    peso,
  }: IIncluiPacienteDTO): Promise<Paciente> {
    const novoPaciente = this.pacienteRepository.criar({
      medico_id,
      nome,
      telefone,
      email,
      dataNascimento,
      sexo,
      altura,
      peso,
    });
    const error = await validarCampos(novoPaciente);

    if (error) {
      throw new AppError(error);
    }

    const medicoExiste = await this.medicoRepository.findById(medico_id);

    if (!medicoExiste) {
      throw new AppError('Médico não existe.');
    }

    await this.pacienteRepository.incluir(novoPaciente);

    return novoPaciente;
  }
}

export default IncluiPacienteService;
