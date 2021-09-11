import { inject, injectable } from 'tsyringe';

import { IIncluiAnotacaoConsultaDTO } from '@modules/prontomed/dtos/IConsultaDTO';
import Consulta from '@modules/prontomed/entities/Consulta';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

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
    const consulta = new Consulta();
    Object.assign(consulta, {
      id,
      anotacao,
    });
    const error = await validarCampos(consulta);

    if (error) {
      throw new AppError(error);
    }

    const consultaExiste = await this.consultaRepository.findById(id);

    if (!consultaExiste) {
      throw new AppError('Consulta não existe.');
    }

    Object.assign(consultaExiste, {
      id,
      anotacao,
    });

    const anotacaoDaConsultaAlterada =
      await this.consultaRepository.incluirAnotacao(consultaExiste);

    return anotacaoDaConsultaAlterada;
  }
}

export default IncluiAnotacaoConsultaService;
