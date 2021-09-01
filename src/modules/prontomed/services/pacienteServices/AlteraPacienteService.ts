import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IAlteraPacienteDTO } from '@modules/prontomed/dtos/IPacienteDTO';
import Paciente from '@modules/prontomed/entities/Paciente';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';

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
    if (!id) {
      throw new AppError('ID do Paciente é obrigatório.');
    }

    if (typeof id !== 'string') {
      throw new AppError('ID do Paciente deve ser uma string.');
    }

    if (!medico_id) {
      throw new AppError('ID do Médico é obrigatório.');
    }

    if (typeof medico_id !== 'string') {
      throw new AppError('ID do Médico deve ser uma string.');
    }

    if (!nome) {
      throw new AppError('Nome do Paciente é obrigatório.');
    }

    if (typeof nome !== 'string') {
      throw new AppError('Nome do Paciente deve ser uma string.');
    }

    if (!telefone) {
      throw new AppError('Telefone do Paciente é obrigatório.');
    }

    if (typeof telefone !== 'number') {
      throw new AppError('Telefone do Paciente deve ser um number.');
    }

    if (!email) {
      throw new AppError('E-mail do Paciente é obrigatório.');
    }

    if (typeof email !== 'string') {
      throw new AppError('E-mail do Paciente deve ser uma string.');
    }

    if (!validator.isEmail(email)) {
      throw new AppError('E-mail do Paciente deve ser um e-mail válido.');
    }

    if (!dataNascimento) {
      throw new AppError('Data de Nascimento do Paciente é obrigatório.');
    }

    if (!validator.isDate(dataNascimento.toString())) {
      throw new AppError(
        'Data de Nascimento do Paciente deve ser uma data no formato yyyy-MM-dd.',
      );
    }

    if (!sexo) {
      throw new AppError('Sexo do Paciente é obrigatório.');
    }

    if (typeof sexo !== 'number') {
      throw new AppError('Sexo do Paciente deve ser um number.');
    }

    if (!altura) {
      throw new AppError('Altura do Paciente é obrigatório.');
    }

    if (typeof altura !== 'number') {
      throw new AppError('Altura do Paciente deve ser um number.');
    }

    if (!peso) {
      throw new AppError('Peso do Paciente é obrigatório.');
    }

    if (typeof peso !== 'number') {
      throw new AppError('Peso do Paciente deve ser um number.');
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

    const paciente = await this.pacienteRepository.alterar(pacienteExiste);

    return paciente;
  }
}

export default AlteraPacienteService;
