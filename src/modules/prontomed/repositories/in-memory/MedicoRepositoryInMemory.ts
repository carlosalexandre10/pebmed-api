import { v4 } from 'uuid';

import IMedicoDTO from '../../dtos/IMedicoDTO';
import Medico from '../../entities/Medico';
import IMedicoRepository from '../IMedicoRepository';

class MedicoRepositoryInMemory implements IMedicoRepository {
  medicos: Medico[] = [];

  async incluir({ nome, crm }: IMedicoDTO): Promise<Medico> {
    const medico = new Medico();

    Object.assign(medico, {
      id: v4(),
      nome,
      crm,
    });

    this.medicos.push(medico);

    return medico;
  }

  async listar(): Promise<Medico[]> {
    const { medicos } = this;

    return medicos;
  }

  async findById(id: string): Promise<Medico | null> {
    const medico = this.medicos.find(medico => medico.id === id);

    return medico || null;
  }

  async findByCRM(crm: number): Promise<Medico | null> {
    const medico = this.medicos.find(medico => medico.crm === crm);

    return medico || null;
  }
}

export default MedicoRepositoryInMemory;
