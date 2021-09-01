import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateConsulta1629562172524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consulta',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'paciente_id',
            type: 'uuid',
          },
          {
            name: 'data',
            type: 'date',
          },
          {
            name: 'anotacao',
            type: 'text',
            isNullable: true,
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
      'consulta',
      new TableForeignKey({
        name: 'ConsultaPaciente',
        columnNames: ['paciente_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'paciente',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('consulta', 'ConsultaPaciente');
    await queryRunner.dropTable('consulta');
  }
}
