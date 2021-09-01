import { IIncluiAgendamentoDTO } from '../dtos/IAgendamentoDTO';
import Agendamento from '../entities/Agendamento';

interface IAgendamentoRepository {
  incluir(agendamentoDTO: IIncluiAgendamentoDTO): Promise<Agendamento>;
  listar(): Promise<Agendamento[]>;
  alterar(agendamento: Agendamento): Promise<Agendamento>;
  excluir(agendamento: Agendamento): Promise<void>;
  findById(id: string): Promise<Agendamento | null>;
  findByData(data: Date): Promise<Agendamento | null>;
}

export default IAgendamentoRepository;
