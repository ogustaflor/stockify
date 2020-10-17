import  { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Company from './../models/Company';

export default {

    index: async (request: Request, response: Response) => {
        const companyRepository = getRepository(Company);
        
        const companies = await companyRepository.find();

        return response.status(200).json(companies);
    }

    ,

    store: async (request: Request, response: Response) => {
        const { name, cnpj } = request.body;

        const companyRepository = getRepository(Company);

        const company = companyRepository.create({ name, cnpj });

        await companyRepository.save(company);

        return response.status(201).json(company);
    }

    ,

    show: async (request: Request, response: Response) => {
        const { id } = request.params;

        const companyRepository = getRepository(Company);

        const company = await companyRepository.findOne(id);

        return response.status(company ? 200 : 204).json(company);
    }

}