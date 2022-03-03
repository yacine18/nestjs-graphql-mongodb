import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document

@Schema()
@ObjectType()
export class User {
  
  @Field(() => ID)
  _id: number;

  @Prop({required:true, unique:true})
  @Field()
  email:string

  @Prop({required:true})
  @Field()
  password:string
}

export const UserSchema = SchemaFactory.createForClass(User)