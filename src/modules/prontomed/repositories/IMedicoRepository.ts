import { IIncluiMedicoDTO, IListaMedicoDTO } from '../dtos/IMedicoDTO';
import Medico from '../entities/Medico';

interface IMedicoRepository {
  criar(medicoDTO: IIncluiMedicoDTO): Medico;
  incluir(medico: Medico): Promise<void>;
  listar(): Promise<IListaMedicoDTO[]>;
  findById(id: string): Promise<Medico | null>;
  findByCRM(crm: number): Promise<Medico | null>;
}

export default IMedicoRepository;
