import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Max,
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

import Medico from './Medico';

@Entity('paciente')
class Paciente {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4, { message: 'Id do Paciente deve ser um UUID válido' })
  id: string;

  @Column()
  @IsUUID(4, { message: 'Id do Médico do Paciente deve ser um UUID válido' })
  @IsNotEmpty({ message: 'Id do Médico do Paciente é obrigatório' })
  medico_id: string;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @Column()
  @MaxLength(100, {
    message: 'Nome do Paciente deve ter no máximo 100 caracteres',
  })
  @IsString({ message: 'Nome do Paciente deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do Paciente é obrigatório' })
  nome: string;

  @Column()
  @IsPositive({ message: 'Telefone do Paciente deve ser um número positivo' })
  @IsNotEmpty({ message: 'Telefone do Paciente é obrigatório' })
  telefone: number;

  @Column()
  @MaxLength(50, {
    message: 'E-mail do Paciente deve ter no máximo 100 caracteres',
  })
  @IsEmail({}, { message: 'E-mail do Paciente deve ser um e-mail válido' })
  @IsNotEmpty({ message: 'E-mail do Paciente é obrigatório' })
  email: string;

  @Column()
  @MinLength(10, {
    message:
      'Data de Nascimento do Paciente deve ser uma Date no formato yyyy-MM-dd',
  })
  @MaxLength(10, {
    message:
      'Data de Nascimento do Paciente deve ser uma Date no formato yyyy-MM-dd',
  })
  @IsDateString(
    { strict: true },
    {
      message:
        'Data de Nascimento do Paciente deve ser uma Date no formato yyyy-MM-dd',
    },
  )
  @IsNotEmpty({ message: 'Data de Nascimento do Paciente é obrigatório' })
  dataNascimento: Date;

  @Column()
  @Max(2, {
    message:
      'Sexo do Paciente deve ser um número positivo: (1) Masculino, (2) Feminino',
  })
  @IsPositive({
    message:
      'Sexo do Paciente deve ser um número positivo: (1) Masculino, (2) Feminino',
  })
  @IsInt({
    message:
      'Sexo do Paciente deve ser um inteiro positivo: (1) Masculino, (2) Feminino',
  })
  @IsNotEmpty({ message: 'Sexo do Paciente é obrigatório' })
  sexo: number;

  @Column()
  @IsPositive({
    message: 'Altura do Paciente deve ser um número positivo',
  })
  @IsNotEmpty({ message: 'Altura do Paciente é obrigatório' })
  altura: number;

  @Column()
  @IsPositive({
    message: 'Peso do Paciente deve ser um número positivo',
  })
  @IsInt({
    message: 'Peso do Paciente deve ser um inteiro positivo',
  })
  @IsNotEmpty({ message: 'Peso do Paciente é obrigatório' })
  peso: number;

  @Column(CreateDateColumn)
  created_at: Date;

  @Column(UpdateDateColumn)
  updated_at: Date;
}

export default Paciente;
