import { IIncluiConsultaDTO } from '../dtos/IConsultaDTO';
import Consulta from '../entities/Consulta';

interface IConsultaRepository {
  criar(consultaDTO: IIncluiConsultaDTO): Consulta;
  incluir(consulta: Consulta): Promise<void>;
  incluirAnotacao(consulta: Consulta): Promise<Consulta>;
  listar(): Promise<Consulta[]>;
  findById(id: string): Promise<Consulta | null>;
}

export default IConsultaRepository;
