import { IIncluiPacienteDTO } from '../dtos/IPacienteDTO';
import Paciente from '../entities/Paciente';

interface IPacienteRepository {
  incluir(pacienteDTO: IIncluiPacienteDTO): Promise<Paciente>;
  listar(): Promise<Paciente[]>;
  alterar(paciente: Paciente): Promise<Paciente>;
  findById(id: string): Promise<Paciente | null>;
}

export default IPacienteRepository;
