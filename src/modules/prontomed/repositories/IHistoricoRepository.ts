import IHistoricoDTO from '../dtos/IHistoricoDTO';
import Historico from '../entities/Historico';

interface IHistoricoRepository {
  incluir(historicoDTO: IHistoricoDTO): Promise<void>;
  listar(): Promise<Historico[]>;
}

export default IHistoricoRepository;
