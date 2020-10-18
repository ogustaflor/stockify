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

        if (!picture) return response.status(500).send(`Error: Picture is required, please send it in the request body.`);

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

    ,

    update: async (request: Request, response: Response) => {
        const { id } = request.params;
        const { name, price } = request.body;

        const productRepository = getRepository(Product);

        const product = productRepository.create({ name, price });

        const picture = request.file;

        if (picture) product.picture_file_name = picture.filename;

        await productRepository.update({ id: parseInt(id) }, product);

        return response.status(201).json(product);
    }

    ,

    increment: async (request: Request, response: Response) => {
        const { id } = request.params;
        const { value = 1 } = request.body;

        const productRepository = getRepository(Product);

        productRepository.increment({ id: parseInt(id) }, 'amount', value);

        response.status(200).send();
    }

    ,

    decrement: async (request: Request, response: Response) => {
        const { id } = request.params;
        const { value = 1 } = request.body;

        const productRepository = getRepository(Product);

        productRepository.decrement({ id: parseInt(id) }, 'amount', value);

        response.status(200).send();
    }

    ,

    activate: async (request: Request, response: Response) => {
        const { id } = request.params;

        const productRepository = getRepository(Product);

        productRepository.update({ id: parseInt(id) }, { available: true })

        response.status(200).send();
    }
    
    ,

    deactivate: async (request: Request, response: Response) => {
        const { id } = request.params;

        const productRepository = getRepository(Product);

        productRepository.update({ id: parseInt(id) }, { available: false })

        response.status(200).send();
    }

}