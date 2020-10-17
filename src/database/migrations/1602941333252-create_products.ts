import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1602941333252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const productsTable = new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                    unsigned: true
                },
                {
                    name: 'amount',
                    type: 'integer',
                    unsigned: true,
                    default: 0
                },
                {
                    name: 'available',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'picture_file_name',
                    type: 'varchar'
                },
                {
                    name: 'company_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ProductCompany',
                    columnNames: [ 'company_id' ],
                    referencedColumnNames: [ 'id' ],
                    referencedTableName: 'companies',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        });

        return await queryRunner.createTable(productsTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('products');
    }

}
