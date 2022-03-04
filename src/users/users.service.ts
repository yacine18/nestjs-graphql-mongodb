import { signJwt } from './../utils/jwt.utils';
import { CreateUserInput } from './dto/user.input';
import { User, UserDocument } from './schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import Ctx from 'src/types/ctx.types';
import { CookieOptions } from 'express';
import { omit } from 'lodash';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: true,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup({ email, password }: CreateUserInput): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new Error('User already exists!');
    }

    const salt = await bcrypt.genSalt(10);

    const newUser = {
      email,
      password: bcrypt.hashSync(password, salt),
    };

    return this.userModel.create(newUser);
  }

  async login({ email, password }: CreateUserInput, ctx: Ctx): Promise<User> {
    const user = await this.userModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      throw new Error('Email or Password incorrect');
    }

    const token = signJwt(omit(user.toJSON(), ['password']));

    ctx.res.cookie("token", token, cookieOptions)
    return user;
  }

  async logout(context:Ctx) {
    context.res.cookie('token', '', {...cookieOptions, maxAge:0})
    return null
  }
}
