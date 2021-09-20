import MedicoRepositoryInMemory from '@modules/prontomed/repositories/in-memory/MedicoRepositoryInMemory';
import PacienteRepositoryInMemory from '@modules/prontomed/repositories/in-memory/PacienteRepositoryInMemory';
import IncluiMedicoService from '@modules/prontomed/services/medicoServices/IncluiMedicoService';
import AlteraPacienteService from '@modules/prontomed/services/pacienteServices/AlteraPacienteService';
import IncluiPacienteService from '@modules/prontomed/services/pacienteServices/IncluiPacienteService';

let pacienteRepositoryInMemory: PacienteRepositoryInMemory;
let medicoRepositoryInMemory: MedicoRepositoryInMemory;
let alteraPacienteService: AlteraPacienteService;
let incluiPacienteService: IncluiPacienteService;
let incluiMedicoService: IncluiMedicoService;

describe('Incluir Paciente', () => {
  beforeEach(() => {
    pacienteRepositoryInMemory = new PacienteRepositoryInMemory();
    medicoRepositoryInMemory = new MedicoRepositoryInMemory();
    alteraPacienteService = new AlteraPacienteService(
      pacienteRepositoryInMemory,
      medicoRepositoryInMemory,
    );
    alteraPacienteService = new AlteraPacienteService(
      pacienteRepositoryInMemory,
      medicoRepositoryInMemory,
    );
    incluiPacienteService = new IncluiPacienteService(
      pacienteRepositoryInMemory,
      medicoRepositoryInMemory,
    );
    incluiMedicoService = new IncluiMedicoService(medicoRepositoryInMemory);
  });

  it('deve ser capaz de alterar um paciente', async () => {
    const medico = await incluiMedicoService.execute({
      nome: 'Carlos Alexandre',
      crm: 99999,
      senha: 'carlos123',
    });

    const paciente = await incluiPacienteService.execute({
      medico_id: medico.id,
      nome: 'Carlos Alexandre',
      telefone: 62986020748,
      email: 'gessyka@gmail.com',
      dataNascimento: new Date().toISOString().slice(0, 10) as unknown as Date,
      sexo: 2,
      altura: 1.6,
      peso: 56,
    });

    const pacienteAlterado = await alteraPacienteService.execute({
      id: paciente.id,
      medico_id: medico.id,
      nome: 'Carlos Alexandre',
      telefone: 62986020748,
      email: 'gessyka@gmail.com',
      dataNascimento: new Date().toISOString().slice(0, 10) as unknown as Date,
      sexo: 2,
      altura: 1.6,
      peso: 56,
    });

    expect(pacienteAlterado).toHaveProperty('id');
  });
});
