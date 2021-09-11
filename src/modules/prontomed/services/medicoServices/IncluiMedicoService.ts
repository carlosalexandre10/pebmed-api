import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import {
  IIncluiMedicoDTO,
  IListaMedicoDTO,
} from '@modules/prontomed/dtos/IMedicoDTO';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

@injectable()
class IncluiMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({
    nome,
    crm,
    senha,
  }: IIncluiMedicoDTO): Promise<IListaMedicoDTO> {
    const novoMedico = this.medicoRepository.criar({ nome, crm, senha });
    const error = await validarCampos(novoMedico);

    if (error) {
      throw new AppError(error);
    }

    const medicoExiste = await this.medicoRepository.findByCRM(crm);

    if (medicoExiste) {
      throw new AppError('Médico já está cadastrado.');
    }

    novoMedico.senha = await hash(senha, 8);

    await this.medicoRepository.incluir(novoMedico);

    const medico: IListaMedicoDTO = {
      id: novoMedico.id,
      nome: novoMedico.nome,
      crm: novoMedico.crm,
    };

    return medico;
  }
}

export default IncluiMedicoService;
