import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('historico')
class Historico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medico_id: string;

  @Column()
  dataConsulta: Date;

  @Column()
  anotacaoConsulta: string;

  @Column()
  nomePaciente: string;

  @Column()
  telefonePaciente: number;

  @Column()
  emailPaciente: string;

  @Column()
  dataNascimentoPaciente: Date;

  @Column()
  sexoPaciente: number;

  @Column()
  alturaPaciente: number;

  @Column()
  pesoPaciente: number;

  @Column(CreateDateColumn)
  created_at: Date;

  @Column(UpdateDateColumn)
  updated_at: Date;
}

export default Historico;
