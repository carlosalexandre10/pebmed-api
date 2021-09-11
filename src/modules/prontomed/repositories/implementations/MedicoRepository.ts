import { getRepository, Repository } from 'typeorm';

import {
  IIncluiMedicoDTO,
  IListaMedicoDTO,
} from '@modules/prontomed/dtos/IMedicoDTO';
import Medico from '@modules/prontomed/entities/Medico';

import IMedicoRepository from '../IMedicoRepository';

class MedicoRepository implements IMedicoRepository {
  private repository: Repository<Medico>;

  constructor() {
    this.repository = getRepository(Medico);
  }

  criar({ nome, crm, senha }: IIncluiMedicoDTO): Medico {
    return this.repository.create({
      nome,
      crm,
      senha,
    });
  }

  async incluir(medico: Medico): Promise<void> {
    await this.repository.save(medico);
  }

  async listar(): Promise<IListaMedicoDTO[]> {
    const medicos = await this.repository.find({
      select: ['id', 'nome', 'crm'],
    });

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
