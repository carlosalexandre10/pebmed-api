import { getRepository, Repository } from 'typeorm';

import { IIncluiConsultaDTO } from '@modules/prontomed/dtos/IConsultaDTO';
import Consulta from '@modules/prontomed/entities/Consulta';

import IConsultaRepository from '../IConsultaRepository';

class ConsultaRepository implements IConsultaRepository {
  private repository: Repository<Consulta>;

  constructor() {
    this.repository = getRepository(Consulta);
  }

  criar({ paciente_id, data, anotacao }: IIncluiConsultaDTO): Consulta {
    return this.repository.create({
      paciente_id,
      data,
      anotacao,
    });
  }

  async incluir(consulta: Consulta): Promise<void> {
    await this.repository.save(consulta);
  }

  async incluirAnotacao(consulta: Consulta): Promise<Consulta> {
    await this.repository.save(consulta);

    return consulta;
  }

  async listar(): Promise<Consulta[]> {
    const consultas = await this.repository.find();

    return consultas;
  }

  async findById(id: string): Promise<Consulta | null> {
    const consulta = await this.repository.findOne({ id });

    return consulta || null;
  }
}

export default ConsultaRepository;
