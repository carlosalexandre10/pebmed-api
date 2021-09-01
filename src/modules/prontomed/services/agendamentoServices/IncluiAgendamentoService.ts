import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IIncluiAgendamentoDTO } from '@modules/prontomed/dtos/IAgendamentoDTO';
import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class IncluiAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
  ) {}

  async execute({
    paciente_id,
    data,
  }: IIncluiAgendamentoDTO): Promise<Agendamento> {
    if (!paciente_id) {
      throw new AppError('ID do Paciente é obrigatório.');
    }

    if (typeof paciente_id !== 'string') {
      throw new AppError('ID do Paciente deve ser uma string.');
    }

    if (!data) {
      throw new AppError('Data do Agendamento é obrigatório.');
    }

    if (!validator.isDate(data.toString())) {
      throw new AppError(
        'Data do Agendamento deve ser uma data no formato yyyy-MM-dd.',
      );
    }

    const agendamentoJaPossuiPaciente =
      await this.agendamentoRepository.findByData(data);

    if (agendamentoJaPossuiPaciente) {
      throw new AppError('Essa data já possui paciente.');
    }

    const pacienteExiste = await this.pacienteRepository.findById(paciente_id);

    if (!pacienteExiste) {
      throw new AppError('Paciente não existe.');
    }

    const agendamento = await this.agendamentoRepository.incluir({
      paciente_id,
      data,
    });

    return agendamento;
  }
}

export default IncluiAgendamentoService;
