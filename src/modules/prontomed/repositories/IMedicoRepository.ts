import IMedicoDTO from '../dtos/IMedicoDTO';
import Medico from '../entities/Medico';

interface IMedicoRepository {
  incluir(medicoDTO: IMedicoDTO): Promise<Medico>;
  listar(): Promise<Medico[]>;
  findById(id: string): Promise<Medico | null>;
  findByCRM(crm: number): Promise<Medico | null>;
}

export default IMedicoRepository;
