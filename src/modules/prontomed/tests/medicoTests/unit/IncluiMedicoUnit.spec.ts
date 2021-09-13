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
      senha: 'CÇndqwew12212',
    });

    const medicoCriado = await medicoRepositoryInMemory.findByCRM(medico.crm);

    expect(medicoCriado).toHaveProperty('id');
  });

  it('não deve ser capaz de incluir médico com mesmo CRM', async () => {
    expect(async () => {
      const medico = {
        nome: 'Carlos Alexandre',
        crm: 99999,
        senha: 'CÇndqwew12212',
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
