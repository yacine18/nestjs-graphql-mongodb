import { Request, Response } from 'express';
import { User } from '../users/schema/user.schema';

type Ctx = {
  req: Request & { user?: Pick<User, 'email' | '_id'> };
  res: Response;
};

export default Ctx;