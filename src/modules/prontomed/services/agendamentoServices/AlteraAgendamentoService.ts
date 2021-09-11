import { inject, injectable } from 'tsyringe';

import { IAlteraAgendamentoDTO } from '@modules/prontomed/dtos/IAgendamentoDTO';
import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

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
    const agendamento = new Agendamento();
    Object.assign(agendamento, {
      id,
      paciente_id,
      data,
    });
    const error = await validarCampos(agendamento);

    if (error) {
      throw new AppError(error);
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

    await this.agendamentoRepository.alterar(agendamentoExiste);

    return agendamentoExiste;
  }
}

export default AlteraAgendamentoService;
