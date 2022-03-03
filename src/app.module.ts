import { decode } from './utils/jwt.utils';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { get, set } from 'lodash';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yassine:yassine@cluster0.5fb3l.mongodb.net/AuthDB?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      playground: true,

      context: ({ req, res }) => {
        // get cookie from request
        const token = get(req, 'cookies.token');
        console.log('token', token);

        // verify cookie/token
        const user = token ? decode(get(req, 'cookies.token')) : null;

        if (user) {
          set(req, 'user', user);
        }

        return { req, res };
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
