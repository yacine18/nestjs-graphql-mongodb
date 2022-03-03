import Ctx  from 'src/types/ctx.types';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {} 

  @Mutation(() => User)
  signup(@Args('register') createUserInput: CreateUserInput) {
    return this.usersService.signup(createUserInput)
  }

  @Mutation(() => User)
  async login(@Args('input') createUserInput:CreateUserInput, @Context() ctx:Ctx) {
    return this.usersService.login(createUserInput, ctx)
  }

  @Query(() => User, { nullable: true })
  async me(@Context() ctx: Ctx) {
    return ctx.req.user;
  }

  @Query(() => User, {nullable:true})
  async logout(@Context() ctx:Ctx) {
    return this.usersService.logout(ctx)
  }

}
