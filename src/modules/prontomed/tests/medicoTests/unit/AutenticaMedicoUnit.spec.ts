import { IIncluiMedicoDTO } from '@modules/prontomed/dtos/IMedicoDTO';
import MedicoRepositoryInMemory from '@modules/prontomed/repositories/in-memory/MedicoRepositoryInMemory';
import AutenticaMedicoService from '@modules/prontomed/services/medicoServices/AutenticaMedicoService';
import IncluiMedicoService from '@modules/prontomed/services/medicoServices/IncluiMedicoService';
import AppError from '@shared/errors/AppError';

let medicoRepositoryInMemory: MedicoRepositoryInMemory;
let autenticaMedicoService: AutenticaMedicoService;
let incluiMedicoService: IncluiMedicoService;

describe('Autentica Médico', () => {
  beforeEach(() => {
    medicoRepositoryInMemory = new MedicoRepositoryInMemory();
    autenticaMedicoService = new AutenticaMedicoService(
      medicoRepositoryInMemory,
    );
    incluiMedicoService = new IncluiMedicoService(medicoRepositoryInMemory);
  });

  it('deve ser capaz de autenticar um novo médico', async () => {
    const medico: IIncluiMedicoDTO = {
      nome: 'Carlos Alexandre',
      crm: 9999,
      senha: '123456',
    };

    await incluiMedicoService.execute(medico);

    const result = await autenticaMedicoService.execute({
      crm: medico.crm,
      senha: medico.senha,
    });

    expect(result).toHaveProperty('token');
  });

  it('não deve ser capaz de autenticar um médico que não existe', async () => {
    expect(async () => {
      await autenticaMedicoService.execute({
        crm: 3333,
        senha: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de autenticar um médico com senha errada', async () => {
    expect(async () => {
      const medico: IIncluiMedicoDTO = {
        nome: 'Carlos Alexandre',
        crm: 9999,
        senha: '123456',
      };

      await incluiMedicoService.execute(medico);

      await autenticaMedicoService.execute({
        crm: medico.crm,
        senha: 'senhaIncorreta',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
