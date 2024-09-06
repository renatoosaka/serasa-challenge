import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PlantedCropProducer1725632900663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'planted_crops_producers',
        columns: [
          {
            name: 'producer_id',
            type: 'uuid',
          },
          {
            name: 'planted_crop_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['producer_id'],
            referencedTableName: 'producers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['planted_crop_id'],
            referencedTableName: 'planted_crops',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('planted_crops_producers');
  }
}
