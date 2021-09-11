import { inject, injectable } from 'tsyringe';

import { IListaMedicoDTO } from '@modules/prontomed/dtos/IMedicoDTO';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';

@injectable()
class ListaMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute(): Promise<IListaMedicoDTO[]> {
    const medicos = await this.medicoRepository.listar();

    return medicos;
  }
}

export default ListaMedicoService;
