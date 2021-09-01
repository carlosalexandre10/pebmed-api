import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IIncluiConsultaDTO } from '@modules/prontomed/dtos/IConsultaDTO';
import Consulta from '@modules/prontomed/entities/Consulta';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class IncluiConsultaService {
  constructor(
    @inject('ConsultaRepository')
    private consultaRepository: IConsultaRepository,
    @inject('PacienteRepository')
    private pacienteRepository: IPacienteRepository,
  ) {}

  async execute({
    paciente_id,
    data,
    anotacao,
  }: IIncluiConsultaDTO): Promise<Consulta> {
    if (!paciente_id) {
      throw new AppError('ID do Paciente é obrigatório.');
    }

    if (typeof paciente_id !== 'string') {
      throw new AppError('ID do Paciente deve ser uma string.');
    }

    if (!data) {
      throw new AppError('Data da Consulta é obrigatório.');
    }

    if (!validator.isDate(data.toString())) {
      throw new AppError(
        'Data da Consulta deve ser uma data no formato yyyy-MM-dd.',
      );
    }

    if (!anotacao) {
      throw new AppError('Anotação da Consulta é obrigatório.');
    }

    if (typeof anotacao !== 'string') {
      throw new AppError('Anotação da Consulta deve ser uma string.');
    }

    const pacienteExiste = await this.pacienteRepository.findById(paciente_id);

    if (!pacienteExiste) {
      throw new AppError('Paciente não existe.');
    }

    const consulta = await this.consultaRepository.incluir({
      paciente_id,
      data,
      anotacao,
    });

    return consulta;
  }
}

export default IncluiConsultaService;
