import { inject, injectable } from 'tsyringe';

import Agendamento from '@modules/prontomed/entities/Agendamento';
import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';

@injectable()
class ListaAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
  ) {}

  async execute(): Promise<Agendamento[]> {
    const agendamentos = await this.agendamentoRepository.listar();

    return agendamentos;
  }
}

export default ListaAgendamentoService;
