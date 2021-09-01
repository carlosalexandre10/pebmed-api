import { inject, injectable } from 'tsyringe';

import Medico from '@modules/prontomed/entities/Medico';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';

@injectable()
class ListaMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute(): Promise<Medico[]> {
    const medicos = await this.medicoRepository.listar();

    return medicos;
  }
}

export default ListaMedicoService;
