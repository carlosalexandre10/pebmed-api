import { IIncluiMedicoDTO } from '@modules/prontomed/dtos/IMedicoDTO';
import MedicoRepositoryInMemory from '@modules/prontomed/repositories/in-memory/MedicoRepositoryInMemory';
import IncluiMedicoService from '@modules/prontomed/services/medicoServices/IncluiMedicoService';
import AppError from '@shared/errors/AppError';

let medicoRepositoryInMemory: MedicoRepositoryInMemory;
let incluiMedicoService: IncluiMedicoService;

describe('Incluir Medico', () => {
  beforeEach(() => {
    medicoRepositoryInMemory = new MedicoRepositoryInMemory();
    incluiMedicoService = new IncluiMedicoService(medicoRepositoryInMemory);
  });

  it('deve ser capaz de incluir um novo médico', async () => {
    const medico = await incluiMedicoService.execute({
      nome: 'Carlos Alexandre',
      crm: 99999,
      senha: 'carlos123',
    });

    const medicoCriado = await medicoRepositoryInMemory.findByCRM(medico.crm);

    expect(medicoCriado).toHaveProperty('id');
  });

  it('não deve ser capaz de incluir um médico com mesmo CRM', async () => {
    expect(async () => {
      const medico: IIncluiMedicoDTO = {
        nome: 'Carlos Alexandre',
        crm: 99999,
        senha: 'carlos123',
      };

      await incluiMedicoService.execute({
        nome: medico.nome,
        crm: medico.crm,
        senha: medico.senha,
      });

      await incluiMedicoService.execute({
        nome: medico.nome,
        crm: medico.crm,
        senha: medico.senha,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
