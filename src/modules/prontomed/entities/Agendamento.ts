import {
  IsDateString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Paciente from './Paciente';

@Entity('agendamento')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4, { message: 'Id do Agendamento deve ser um UUID válido' })
  id: string;

  @Column()
  @IsUUID(4, {
    message: 'Id do Paciente do Agendamento deve ser um UUID válido',
  })
  @IsNotEmpty({ message: 'Id do Paciente do Agendamento é obrigatório' })
  paciente_id: string;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @Column()
  @MinLength(10, {
    message: 'Data da Consulta deve ser uma Date no formato yyyy-MM-dd',
  })
  @MaxLength(10, {
    message: 'Data da Consulta deve ser uma Date no formato yyyy-MM-dd',
  })
  @IsDateString(
    { strict: true },
    {
      message: 'Data da Consulta deve ser uma Date no formato yyyy-MM-dd',
    },
  )
  @IsNotEmpty({ message: 'Data da Consulta é obrigatório' })
  data: Date;

  @Column(CreateDateColumn)
  created_at: Date;

  @Column(UpdateDateColumn)
  updated_at: Date;
}

export default Agendamento;
