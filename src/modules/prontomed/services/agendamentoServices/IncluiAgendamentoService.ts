import { inject, injectable } from 'tsyringe';

import { IIncluiAgendamentoDTO } from '@modules/prontomed/dtos/IAgendamentoDTO';
import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

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
    const novoAgendamento = this.agendamentoRepository.criar({
      paciente_id,
      data,
    });
    const error = await validarCampos(novoAgendamento);

    if (error) {
      throw new AppError(error);
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

    await this.agendamentoRepository.incluir(novoAgendamento);

    return novoAgendamento;
  }
}

export default IncluiAgendamentoService;
