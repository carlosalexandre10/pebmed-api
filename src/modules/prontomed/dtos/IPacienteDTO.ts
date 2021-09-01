export interface IIncluiPacienteDTO {
  medico_id: string;
  nome: string;
  telefone: number;
  email: string;
  dataNascimento: Date;
  sexo: number;
  altura: number;
  peso: number;
}

export interface IAlteraPacienteDTO {
  id: string;
  medico_id: string;
  nome: string;
  telefone: number;
  email: string;
  dataNascimento: Date;
  sexo: number;
  altura: number;
  peso: number;
}
