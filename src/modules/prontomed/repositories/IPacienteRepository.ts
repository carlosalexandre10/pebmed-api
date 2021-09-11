import { IIncluiPacienteDTO } from '../dtos/IPacienteDTO';
import Paciente from '../entities/Paciente';

interface IPacienteRepository {
  criar(pacienteDTO: IIncluiPacienteDTO): Paciente;
  incluir(paciente: Paciente): Promise<void>;
  listar(): Promise<Paciente[]>;
  alterar(paciente: Paciente): Promise<void>;
  findById(id: string): Promise<Paciente | null>;
}

export default IPacienteRepository;
