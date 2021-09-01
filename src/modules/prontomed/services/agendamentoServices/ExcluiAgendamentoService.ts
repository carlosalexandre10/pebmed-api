import { inject, injectable } from 'tsyringe';

import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ExcluiAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('ID do Agendamento é obrigatório.');
    }

    if (typeof id !== 'string') {
      throw new AppError('ID do Agendamento deve ser uma string.');
    }

    const agendamentoExiste = await this.agendamentoRepository.findById(id);

    if (!agendamentoExiste) {
      throw new AppError('Agendamento não existe.');
    }

    await this.agendamentoRepository.excluir(agendamentoExiste);
  }
}

export default ExcluiAgendamentoService;
