import IMedicoDTO from '../dtos/IMedicoDTO';
import Medico from '../entities/Medico';

interface IMedicoRepository {
  criar(medicoDTO: IMedicoDTO): Medico;
  incluir(medico: Medico): Promise<Medico>;
  listar(): Promise<Medico[]>;
  findById(id: string): Promise<Medico | null>;
  findByCRM(crm: number): Promise<Medico | null>;
}

export default IMedicoRepository;
