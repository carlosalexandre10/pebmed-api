import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHistorico1629563268905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'historico',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'medico_id',
            type: 'uuid',
          },
          {
            name: 'dataConsulta',
            type: 'date',
          },
          {
            name: 'anotacaoConsulta',
            type: 'text',
          },
          {
            name: 'nomePaciente',
            type: 'varchar(100)',
          },
          {
            name: 'telefonePaciente',
            type: 'integer',
          },
          {
            name: 'emailPaciente',
            type: 'varchar(50)',
          },
          {
            name: 'dataNascimentoPaciente',
            type: 'date',
          },
          {
            name: 'sexoPaciente',
            type: 'smallint',
          },
          {
            name: 'alturaPaciente',
            type: 'numeric(3, 2)',
          },
          {
            name: 'pesoPaciente',
            type: 'smallint',
          },
          {
            name: 'dataExclusao',
            type: 'date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('historico');
  }
}
