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
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        super.create(req, res)
    }
    async update(req: IReq, res: IRes) {
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        super.update(req, res)
    }
    async delete(req: IReq, res: IRes) {
        if (req.user.role !== 'admin' && req.user.role !== 'seller')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        super.delete(req, res)
    }
}

export default new ProductsController(productService);
