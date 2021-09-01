import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IAlteraAgendamentoDTO } from '@modules/prontomed/dtos/IAgendamentoDTO';
import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class AlteraAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
  ) {}

  async execute({
    id,
    paciente_id,
    data,
  }: IAlteraAgendamentoDTO): Promise<Agendamento> {
    if (!id) {
      throw new AppError('ID do Agendamento é obrigatório.');
    }

    if (typeof id !== 'string') {
      throw new AppError('ID do Agendamento deve ser uma string.');
    }

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

    const pacienteExiste = await this.pacienteRepository.findById(paciente_id);

    if (!pacienteExiste) {
      throw new AppError('Paciente não existe.');
    }

    const agendamentoExiste = await this.agendamentoRepository.findById(id);

    if (!agendamentoExiste) {
      throw new AppError('Agendamento não existe.');
    }

    const agendamentoJaPossuiPaciente =
      await this.agendamentoRepository.findByData(data);

    if (agendamentoJaPossuiPaciente) {
      throw new AppError('Essa data já possui paciente.');
    }

    Object.assign(agendamentoExiste, {
      id,
      paciente_id,
      data,
    });

    const agendamento = await this.agendamentoRepository.alterar(
      agendamentoExiste,
    );

    return agendamento;
  }
}

export default AlteraAgendamentoService;
