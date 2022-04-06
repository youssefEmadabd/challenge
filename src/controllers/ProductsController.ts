import Controller from './Controller';
import { Product } from '../models';
import { ProductService } from '../services';
import { IProduct } from '../types';
import {
    RequestInterface as IReq,
} from '../types';
import { Response as IRes, NextFunction as INext } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
const productService = new ProductService(Product);

class ProductsController extends Controller<IProduct, ProductService> {
    async create(req: IReq, res: IRes) {
        console.log("🚀 ~ file: ProductsController.ts ~ line 16 ~ ProductsController ~ create ~ req.user.role", req.user.role)
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const { body } = req;
        const product: IProduct = await productService.create({ ...body, sellerId: req.user.sub });
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        res.status(httpStatus.CREATED).json(product);
    }
    async update(req: IReq, res: IRes) {
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const { body } = req;
        const product: IProduct = await productService.update({ _id: body.productId }, body);
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        res.status(httpStatus.CREATED).json(product);
    }
    async delete(req: IReq, res: IRes) {
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const product: IProduct = await productService.delete({ _id: req.body.productId });
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        res.status(httpStatus.NO_CONTENT).send();
    }
}

export default new ProductsController(productService);
