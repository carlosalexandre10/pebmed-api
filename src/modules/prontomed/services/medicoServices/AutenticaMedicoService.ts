import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { IAutenticaMedicoDTO } from '@modules/prontomed/dtos/IMedicoDTO';
import Medico from '@modules/prontomed/entities/Medico';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import AppError from '@shared/errors/AppError';
import validarCampos from '@shared/errors/ValidaCampos';

interface IResponse {
  medico: {
    id: string;
    nome: string;
    crm: number;
  };
  token: string;
}

@injectable()
class AutenticaMedicoService {
  constructor(
    @inject('MedicoRepository')
    private medicoRepository: IMedicoRepository,
  ) {}

  async execute({ crm, senha }: IAutenticaMedicoDTO): Promise<IResponse> {
    const medico = new Medico();
    Object.assign(medico, { crm, senha });
    const error = await validarCampos(medico);

    if (error) {
      throw new AppError(error);
    }

    const medicoExiste = await this.medicoRepository.findByCRM(crm);

    if (!medicoExiste) {
      throw new AppError('CRM ou Senha incorretos');
    }

    const senhaEhIgual = compare(senha, medicoExiste.senha);

    if (!senhaEhIgual) {
      throw new AppError('CRM ou Senha incorretos');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: medicoExiste.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const tokenReturn: IResponse = {
      token,
      medico: {
        id: medicoExiste.id,
        nome: medicoExiste.nome,
        crm: medicoExiste.crm,
      },
    };

    return tokenReturn;
  }
}

export default AutenticaMedicoService;
