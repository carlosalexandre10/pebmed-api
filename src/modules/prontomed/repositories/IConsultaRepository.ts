import { IIncluiConsultaDTO } from '../dtos/IConsultaDTO';
import Consulta from '../entities/Consulta';

interface IConsultaRepository {
  incluir(consultaDTO: IIncluiConsultaDTO): Promise<Consulta>;
  incluirAnotacao(consulta: Consulta): Promise<Consulta>;
  listar(): Promise<Consulta[]>;
  findById(id: string): Promise<Consulta | null>;
}

export default IConsultaRepository;
