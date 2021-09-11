import { IIncluiAgendamentoDTO } from '../dtos/IAgendamentoDTO';
import Agendamento from '../entities/Agendamento';

interface IAgendamentoRepository {
  criar(agendamentoDTO: IIncluiAgendamentoDTO): Agendamento;
  incluir(agendamento: Agendamento): Promise<void>;
  listar(): Promise<Agendamento[]>;
  alterar(agendamento: Agendamento): Promise<void>;
  excluir(agendamento: Agendamento): Promise<void>;
  findById(id: string): Promise<Agendamento | null>;
  findByData(data: Date): Promise<Agendamento | null>;
}

export default IAgendamentoRepository;
