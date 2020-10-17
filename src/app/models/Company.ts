import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import Product from './Product';

@Entity('companies')
export default class Company {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column()
    cnpj: number;

    @OneToMany(type => Product, product => product.company)
    @JoinColumn({ name: 'company_id' })
    products: Product[];

}