import { getRepository, Repository } from 'typeorm';

import { IIncluiAgendamentoDTO } from '@modules/prontomed/dtos/IAgendamentoDTO';
import Agendamento from '@modules/prontomed/entities/Agendamento';

import IAgendamentoRepository from '../IAgendamentoRepository';

class AgendamentoRepository implements IAgendamentoRepository {
  private repository: Repository<Agendamento>;

  constructor() {
    this.repository = getRepository(Agendamento);
  }

  async incluir({
    paciente_id,
    data,
  }: IIncluiAgendamentoDTO): Promise<Agendamento> {
    const agendamento = this.repository.create({
      paciente_id,
      data,
    });

    await this.repository.save(agendamento);

    return agendamento;
  }

  async listar(): Promise<Agendamento[]> {
    const agendamentos = await this.repository.find();

    return agendamentos;
  }

  async alterar(agendamento: Agendamento): Promise<Agendamento> {
    await this.repository.save(agendamento);

    return agendamento;
  }

  async excluir(agendamento: Agendamento): Promise<void> {
    await this.repository.delete(agendamento);
  }

  async findById(id: string): Promise<Agendamento | null> {
    const agendamento = await this.repository.findOne({ id });

    return agendamento || null;
  }

  async findByData(data: Date): Promise<Agendamento | null> {
    const agendamento = await this.repository.findOne({ data });

    return agendamento || null;
  }
}

export default AgendamentoRepository;
