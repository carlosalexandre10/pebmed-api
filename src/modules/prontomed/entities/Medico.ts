import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medico')
class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MaxLength(100, {
    message: 'Nome do Médico deve ter no máximo 100 caracteres',
  })
  @IsString({ message: 'Nome do Médico deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do Médico é obrigatório' })
  nome: string;

  @Column()
  @IsInt({
    message: 'CRM do Médico deve ser um inteiro positivo',
  })
  @IsPositive({ message: 'CRM do Médico deve ser um número positivo' })
  @IsNotEmpty({ message: 'CRM do Médico é obrigatório' })
  crm: number;

  @Column()
  @MaxLength(20, {
    message: 'Senha do Médico deve ter no máximo 20 caracteres',
  })
  @IsString({ message: 'Senha do Médico deve ser uma string' })
  @IsNotEmpty({ message: 'Senha do Médico é obrigatório' })
  senha: string;

  @Column(CreateDateColumn)
  created_at: Date;

  @Column(UpdateDateColumn)
  updated_at: Date;
}

export default Medico;
