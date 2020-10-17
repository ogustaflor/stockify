import { Request, Response } from "express";
import { getRepository } from 'typeorm';

import Product from './../models/Product';

export default {

    index: async (request: Request, response: Response) => {
        const productRepository = getRepository(Product);
        
        const products = await productRepository.find();

        return response.status(200).json(products);
    }

    ,

    store: async (request: Request, response: Response) => {
        const { 
            name, 
            price, 
            amount = 0, 
            available = true, 
            company_id 
        } = request.body;

        const productRepository = getRepository(Product);

        const picture = request.file;

        const product = productRepository.create({ 
            name, 
            price, 
            amount,
            available,
            picture_file_name: picture.filename,
            company: { id: company_id }
        });

        await productRepository.save(product);

        return response.status(201).json(product);
    }

    ,

    show: async (request: Request, response: Response) => {
        const { id } = request.params;

        const productRepository = getRepository(Product);

        const product = await productRepository.findOne(id);

        return response.status(product ? 200 : 204).json(product);
    }

}