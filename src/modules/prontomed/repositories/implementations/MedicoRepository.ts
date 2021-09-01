import { getRepository, Repository } from 'typeorm';

import IMedicoDTO from '@modules/prontomed/dtos/IMedicoDTO';
import Medico from '@modules/prontomed/entities/Medico';

import IMedicoRepository from '../IMedicoRepository';

class MedicoRepository implements IMedicoRepository {
  private repository: Repository<Medico>;

  constructor() {
    this.repository = getRepository(Medico);
  }

  async incluir({ nome, crm }: IMedicoDTO): Promise<Medico> {
    const medico = this.repository.create({
      nome,
      crm,
    });

    await this.repository.save(medico);

    return medico;
  }

  async listar(): Promise<Medico[]> {
    const medicos = await this.repository.find();

    return medicos;
  }

  async findById(id: string): Promise<Medico | null> {
    const medico = await this.repository.findOne(id);

    return medico || null;
  }

  async findByCRM(crm: number): Promise<Medico | null> {
    const medico = await this.repository.findOne({ crm });

    return medico || null;
  }
}

export default MedicoRepository;
