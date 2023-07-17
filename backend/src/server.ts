import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient, ObjectId } from 'mongodb';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { err401 } from './helpers/statusCodes';
dotenv.config();

const PORT = Number.parseInt(process.env.PORT);
interface MyContext {
    token?: String;
}

const startServer = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
        console.log('MongoDB connection successful');

        const db = client.db();

        const server = new ApolloServer<MyContext>({
            schema: makeExecutableSchema({
                typeDefs,
                resolvers
            }),
            introspection: true
        });

        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => {
                const usersCollection = db.collection('users');
                const postsCollection = db.collection('posts');
                const authorizationHeader = req.headers.authorization || '';
                const token = authorizationHeader.replace('Bearer ', '');
                let userId: string | undefined;
                let user: any | undefined;

                if (token) {
                    try {
                        // Verify and decode the access token
                        const decodedToken = jwt.verify(
                            token,
                            process.env.JWT_SECRET_KEY
                        ) as JwtPayload;

                        // Extract user information from the decoded token
                        const { user_id } = decodedToken;
                        userId = user_id;
                        user = await usersCollection.findOne({
                            _id: new ObjectId(user_id),
                            token // Check if the token in the database matches the token from the request
                        });

                        if (!user) {
                            // Token exists but user not found or token mismatch, indicating unauthorized access
                            throw new GraphQLError(
                                'Unauthorized access',
                                err401
                            );
                        }
                    } catch (error) {
                        console.error(
                            'Error decoding or validating token:',
                            error
                        );
                        // Token is invalid or expired, indicating unauthorized access
                        throw new GraphQLError('Unauthorized access', err401);
                    }
                }
                return { userId, user, usersCollection, postsCollection };
            },
            listen: { port: PORT }
        });
        console.log(`Server started at ${url}`);
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
