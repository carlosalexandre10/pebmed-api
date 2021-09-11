import { inject, injectable } from 'tsyringe';

import { IIncluiConsultaDTO } from '@modules/prontomed/dtos/IConsultaDTO';
import Consulta from '@modules/prontomed/entities/Consulta';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

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
    const novaConsulta = this.consultaRepository.criar({
      paciente_id,
      data,
      anotacao,
    });
    const error = await validarCampos(novaConsulta);

    if (error) {
      throw new AppError(error);
    }

    const pacienteExiste = await this.pacienteRepository.findById(paciente_id);

    if (!pacienteExiste) {
      throw new AppError('Paciente não existe.');
    }

    await this.consultaRepository.incluir(novaConsulta);

    return novaConsulta;
  }
}

export default IncluiConsultaService;
