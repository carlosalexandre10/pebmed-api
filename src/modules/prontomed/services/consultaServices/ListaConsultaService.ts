import { inject, injectable } from 'tsyringe';

import Consulta from '@modules/prontomed/entities/Consulta';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';

@injectable()
class ListaConsultaService {
  constructor(
    @inject('ConsultaRepository')
    private consultaRepository: IConsultaRepository,
  ) {}

  async execute(): Promise<Consulta[]> {
    const consultas = await this.consultaRepository.listar();

    return consultas;
  }
}

export default ListaConsultaService;
