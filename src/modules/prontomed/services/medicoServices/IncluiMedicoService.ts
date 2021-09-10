import { inject, injectable } from 'tsyringe';

import IMedicoDTO from '@modules/prontomed/dtos/IMedicoDTO';
import Medico from '@modules/prontomed/entities/Medico';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

@injectable()
class IncluiMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({ nome, crm }: IMedicoDTO): Promise<Medico> {
    const novoMedico = this.medicoRepository.criar({ nome, crm });
    const error = await validarCampos(novoMedico);

    if (error) {
      throw new AppError(error);
    }

    const medicoExiste = await this.medicoRepository.findByCRM(crm);

    if (medicoExiste) {
      throw new AppError('Médico já está cadastrado.');
    }

    const medico = await this.medicoRepository.incluir(novoMedico);

    return medico;
  }
}

export default IncluiMedicoService;
