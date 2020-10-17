import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

import Company from './Company';

@Entity('products')
export default class Product {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    amount: number;

    @Column()
    available: boolean;

    @Column()
    picture_file_name: string;

    @Column()
    company_id: number;

    @ManyToOne(type => Company, company => company.products)
    @JoinColumn({ name: 'company_id' })
    company: Company;

}