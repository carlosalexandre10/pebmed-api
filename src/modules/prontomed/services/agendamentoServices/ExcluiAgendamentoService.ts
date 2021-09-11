import { inject, injectable } from 'tsyringe';

import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

@injectable()
class ExcluiAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const agendamento = new Agendamento();
    Object.assign(agendamento, {
      id,
    });
    const error = await validarCampos(agendamento);

    if (error) {
      throw new AppError(error);
    }

    const agendamentoExiste = await this.agendamentoRepository.findById(id);

    if (!agendamentoExiste) {
      throw new AppError('Agendamento não existe.');
    }

    await this.agendamentoRepository.excluir(agendamentoExiste);
  }
}

export default ExcluiAgendamentoService;
