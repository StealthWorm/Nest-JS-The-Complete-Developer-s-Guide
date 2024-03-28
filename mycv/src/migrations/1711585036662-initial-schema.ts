import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1711585036662 implements MigrationInterface {
    name = 'InitialSchema1711585036662';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: 'true',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'approved', type: 'boolean', default: 'false' },
                    { name: 'price', type: 'float' },
                    { name: 'make', type: 'varchar' },
                    { name: 'model', type: 'varchar' },
                    { name: 'year', type: 'integer' },
                    { name: 'lng', type: 'float' },
                    { name: 'lat', type: 'float' },
                    { name: 'mileage', type: 'integer' },
                    { name: 'userId', type: 'integer' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ""report""`);
        await queryRunner.query(`DROP TABLE ""user""`);
    }
}
