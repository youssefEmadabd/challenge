
import { Response as IRes, NextFunction as INext } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Controller from './Controller';
import { User, Role, Product } from '../models';
import { UserService, RoleService, ProductService } from '../services';
import { IUser, IRole, IProduct } from '../types';
import {
    RequestInterface as IReq,
} from '../types';

import ApiError from '../utils/ApiError';
import { config } from '../config/config';

const userService = new UserService(User);
const roleService = new RoleService(Role);
const productService = new ProductService(Product);

class UsersController extends Controller<IUser, UserService> {
    async login(req: IReq, res: IRes, next: INext) {
        const { username, password } = req.body;
        const user: IUser = (await this.service.get({
            username
        }, { populate: 'role' }))

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');

        const passwordMatch = await bcrypt.compare(`${password}`, user.password);
        if (!passwordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Credentials")
        }
        const token = await jwt.sign({ sub: user._id, role: user.role.role }, config.jwt.secret, {
            expiresIn: '1h',
        });
        res.status(httpStatus.ACCEPTED).send({
            token,
        });
    }
    async register(req: IReq, res: IRes, next: INext): Promise<void> {
        const { username, password } = req.body;
        const checkUsername = await this.service.isUsernameUnique(username);
        if (checkUsername === true) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
        }
        const { role } = req.params;
        const checkRole: IRole = await roleService.get({ role: role });
        if (!checkRole) throw new ApiError(httpStatus.BAD_REQUEST, 'Role not found');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await this.service.create({
            username,
            password: hashedPassword,
            role: checkRole._id,
        });
        const token = await jwt.sign({ sub: user._id, role: role }, config.jwt.secret, {
            expiresIn: '1h',
        });
        res.status(httpStatus.CREATED).send({ ...user, token });
    }

    async deposit(req: IReq, res: IRes, next: INext): Promise<void> {
        console.log("🚀 ~ file: UsersController.ts ~ line 77 ~ UsersController ~ buy ~ req.user.role", req.user.role)
        if (req.user.role !== 'buyer')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const { deposit } = req.body;
        const acceptableAmountsList = [5, 10, 20, 50, 100];
        if (!acceptableAmountsList.includes(deposit))
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "amount must be one of the following: 5,10,20,50,100");
        const user: IUser = await this.service.get({ _id: req.user.sub }, { populate: 'role' });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        const updatedUser: IUser = await this.service.update({_id:req.user.sub}, {deposit: user.deposit + deposit});
        res.status(httpStatus.OK).json(updatedUser);
    }
    async buy(req: IReq, res: IRes): Promise<void> {
        
        if (req.user.role !== 'buyer')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const { productId } = req.params;
        const user: IUser = await this.service.get({ _id: req?.user?.sub }, { populate: 'role' });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        const product: IProduct = await productService.get({ _id: productId });
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        if (product.cost > user.deposit) throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough balance');

        await userService.update({ _id: req.user.sub }, { balance: user.deposit - product.cost });
        res.status(httpStatus.OK).send({
            productName: product.productName,
            cost: product.cost,
            change: user.deposit - product.cost,
        });
    }
    async reset(req: IReq, res: IRes): Promise<void> {
        if (req.user.role !== 'buyer')
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to perform this action');
        const user: IUser = await this.service.get({ _id:req?.user?.sub });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        await this.service.update({ _id: req?.user?.sub }, { deposit: 0 });
        res.status(httpStatus.OK).send({ message: "Deposit reset" });
    }
}

export default new UsersController(userService);