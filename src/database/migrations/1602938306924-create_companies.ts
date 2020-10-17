import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCompanies1602938306924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const companiesTable = new Table({
            name: 'companies',
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
                    name: 'cnpj',
                    type: 'integer',
                    length: '14',
                    isUnique: true
                }
            ]
        });

        return await queryRunner.createTable(companiesTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('companies');
    }

}
