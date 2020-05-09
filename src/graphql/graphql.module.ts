import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./schema.gql'],
            definitions: {
                path: './graphql.ts'
            },
        }),
    ],
})
export class GraphqlModule {}
