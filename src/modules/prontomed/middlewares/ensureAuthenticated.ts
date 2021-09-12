import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import MedicoRepository from '../repositories/implementations/MedicoRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não foi informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: medico_id } = decoded as ITokenPayload;

    const medicoRepoitory = new MedicoRepository();
    const medico = medicoRepoitory.findById(medico_id);

    if (!medico) {
      throw new AppError('Médico não existe');
    }

    request.medico = {
      id: medico_id,
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
