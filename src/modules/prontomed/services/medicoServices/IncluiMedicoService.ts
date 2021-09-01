import { inject, injectable } from 'tsyringe';

import IMedicoDTO from '@modules/prontomed/dtos/IMedicoDTO';
import Medico from '@modules/prontomed/entities/Medico';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class IncluiMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({ nome, crm }: IMedicoDTO): Promise<Medico> {
    if (!nome) {
      throw new AppError('Nome do Médico é obrigatório.');
    }

    if (typeof nome !== 'string') {
      throw new AppError('Nome do Médico deve ser uma string.');
    }

    if (!crm) {
      throw new AppError('CRM do Médico é obrigatório.');
    }

    if (typeof crm !== 'number') {
      throw new AppError('CRM do Médico deve ser um number.');
    }

    const medicoExiste = await this.medicoRepository.findByCRM(crm);

    if (medicoExiste) {
      throw new AppError('Médico já está cadastrado.');
    }

    const medico = await this.medicoRepository.incluir({ nome, crm });

    return medico;
  }
}

export default IncluiMedicoService;
