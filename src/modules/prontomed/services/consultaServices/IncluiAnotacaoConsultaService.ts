import { inject, injectable } from 'tsyringe';

import { IIncluiAnotacaoConsultaDTO } from '@modules/prontomed/dtos/IConsultaDTO';
import Consulta from '@modules/prontomed/entities/Consulta';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class IncluiAnotacaoConsultaService {
  constructor(
    @inject('ConsultaRepository')
    private consultaRepository: IConsultaRepository,
  ) {}

  async execute({
    id,
    anotacao,
  }: IIncluiAnotacaoConsultaDTO): Promise<Consulta> {
    if (!id) {
      throw new AppError('ID da Consulta é obrigatório.');
    }

    if (typeof id !== 'string') {
      throw new AppError('ID da Consulta deve ser uma string.');
    }

    if (!anotacao) {
      throw new AppError('Anotação da Consulta é obrigatório.');
    }

    if (typeof anotacao !== 'string') {
      throw new AppError('Anotação da Consulta deve ser uma string.');
    }

    const consultaExiste = await this.consultaRepository.findById(id);

    if (!consultaExiste) {
      throw new AppError('Consulta não existe.');
    }

    Object.assign(consultaExiste, {
      id,
      anotacao,
    });

    const consulta = await this.consultaRepository.incluirAnotacao(
      consultaExiste,
    );

    return consulta;
  }
}

export default IncluiAnotacaoConsultaService;
