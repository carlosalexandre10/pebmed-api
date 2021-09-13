import { NextFunction, Request, Response } from 'express';

import MedicoRepository from '@modules/prontomed/repositories/implementations/MedicoRepository';
import AppError from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.medico;

  const medicoRepoitory = new MedicoRepository();
  const medico = await medicoRepoitory.findById(id);

  if (!medico?.isAdmin) {
    throw new AppError('Médico não é administrador');
  }

  return next();
}
