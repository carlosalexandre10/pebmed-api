import { container } from 'tsyringe';

import IAgendamentoRepository from '@modules/prontomed/repositories/IAgendamentoRepository';
import IConsultaRepository from '@modules/prontomed/repositories/IConsultaRepository';
import IHistoricoRepository from '@modules/prontomed/repositories/IHistoricoRepository';
import IMedicoRepository from '@modules/prontomed/repositories/IMedicoRepository';
import AgendamentoRepository from '@modules/prontomed/repositories/implementations/AgendamentoRepository';
import ConsultaRepository from '@modules/prontomed/repositories/implementations/ConsultaRepository';
import HistoricoRepository from '@modules/prontomed/repositories/implementations/HistoricoRepository';
import MedicoRepository from '@modules/prontomed/repositories/implementations/MedicoRepository';
import PacienteRepository from '@modules/prontomed/repositories/implementations/PacienteRepository';
import IPacienteRepository from '@modules/prontomed/repositories/IPacienteRepository';

// IMedicoRepository
container.registerSingleton<IMedicoRepository>(
  'MedicoRepository',
  MedicoRepository,
);

// IPacienteRepository
container.registerSingleton<IPacienteRepository>(
  'PacienteRepository',
  PacienteRepository,
);

// IAgendamentoRepository
container.registerSingleton<IAgendamentoRepository>(
  'AgendamentoRepository',
  AgendamentoRepository,
);

// IConsultaRepository
container.registerSingleton<IConsultaRepository>(
  'ConsultaRepository',
  ConsultaRepository,
);

// IHistoricoRepository
container.registerSingleton<IHistoricoRepository>(
  'HistoricoRepository',
  HistoricoRepository,
);
