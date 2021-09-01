import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePaciente1629562149071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'paciente',
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
            name: 'nome',
            type: 'varchar(100)',
          },
          {
            name: 'telefone',
            type: 'bigint',
          },
          {
            name: 'email',
            type: 'varchar(50)',
          },
          {
            name: 'dataNascimento',
            type: 'date',
          },
          {
            name: 'sexo',
            type: 'smallint',
          },
          {
            name: 'altura',
            type: 'numeric(3, 2)',
          },
          {
            name: 'peso',
            type: 'smallint',
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

    await queryRunner.createForeignKey(
      'paciente',
      new TableForeignKey({
        name: 'PacienteMedico',
        columnNames: ['medico_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medico',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('paciente', 'PacienteMedico');
    await queryRunner.dropTable('paciente');
  }
}
