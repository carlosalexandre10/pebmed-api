import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Medico from './Medico';

@Entity('paciente')
class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medico_id: string;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @Column()
  nome: string;

  @Column()
  telefone: number;

  @Column()
  email: string;

  @Column()
  dataNascimento: Date;

  @Column()
  sexo: number;

  @Column()
  altura: number;

  @Column()
  peso: number;

  @Column(CreateDateColumn)
  created_at: Date;

  @Column(UpdateDateColumn)
  updated_at: Date;
}

export default Paciente;
