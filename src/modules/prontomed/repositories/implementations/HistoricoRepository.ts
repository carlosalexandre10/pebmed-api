import { getRepository, Repository } from 'typeorm';

import IHistoricoDTO from '@modules/prontomed/dtos/IHistoricoDTO';
import Historico from '@modules/prontomed/entities/Historico';

import IHistoricoRepository from '../IHistoricoRepository';

class HistoricoRepository implements IHistoricoRepository {
  private repository: Repository<Historico>;

  constructor() {
    this.repository = getRepository(Historico);
  }

  async incluir({
    medico_id,
    dataConsulta,
    anotacaoConsulta,
    nomePaciente,
    telefonePaciente,
    emailPaciente,
    dataNascimentoPaciente,
    sexoPaciente,
    alturaPaciente,
    pesoPaciente,
  }: IHistoricoDTO): Promise<void> {
    const historico = this.repository.create({
      medico_id,
      dataConsulta,
      anotacaoConsulta,
      nomePaciente,
      telefonePaciente,
      emailPaciente,
      dataNascimentoPaciente,
      sexoPaciente,
      alturaPaciente,
      pesoPaciente,
    });

    await this.repository.save(historico);
  }

  async listar(): Promise<Historico[]> {
    const historicos = await this.repository.find();

    return historicos;
  }
}

export default HistoricoRepository;
