import MedicoRepositoryInMemory from '@modules/prontomed/repositories/in-memory/MedicoRepositoryInMemory';
import ListaMedicoService from '@modules/prontomed/services/medicoServices/ListaMedicoService';
import AppError from '@shared/errors/AppError';

let medicoRepositoryInMemory: MedicoRepositoryInMemory;
let listaMedicoService: ListaMedicoService;

describe('Lista Médicos', () => {
  beforeEach(() => {
    medicoRepositoryInMemory = new MedicoRepositoryInMemory();
    listaMedicoService = new ListaMedicoService(medicoRepositoryInMemory);
  });

  it('deve ser capaz de listar todos os médicos', async () => {
    const medico1 = medicoRepositoryInMemory.criar({
      nome: 'Carlos Alexandre',
      crm: 111111,
      senha: 'carlota11',
    });
    await medicoRepositoryInMemory.incluir(medico1);

    const medicos = await listaMedicoService.execute();

    expect(medicos).toEqual([medico1]);
  });

  it('não deve ser capaz de listar todos os médicos', async () => {
    expect(async () => {
      const medico1 = medicoRepositoryInMemory.criar({
        nome: 'Carlos Alexandre',
        crm: 111111,
        senha: 'carlota11',
      });

      const medicos = await listaMedicoService.execute();

      expect(medicos).toEqual([medico1]);
    }).rejects.toBeInstanceOf(AppError);
  });
});
