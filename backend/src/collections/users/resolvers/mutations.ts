import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { SuccessfullyCreated, UserInput, User, LoginUser } from './interfaces';
import { err400, err401 } from '../../../helpers/statusCodes';
import { validatePassword } from '../../../helpers/validation';
import { error } from 'console';

dotenv.config();
const jwtKey = process.env.JWT_SECRET_KEY;

export const Mutations = {
    Mutation: {
        // REGISTER USER
        async registerUser(
            _: any,
            { registerInput }: { registerInput: UserInput },
            context: any
        ) {
            console.log('registerUser resolver:');
            console.log(registerInput);

            const { name, userName, email, password } = registerInput;
            const existingEmailUser = await context.usersCollection.findOne({
                email
            });
            if (existingEmailUser) {
                throw new GraphQLError('email already exists.', err400);
            }
            const existingUsernameUser = await context.usersCollection.findOne({
                userName
            });
            if (existingUsernameUser) {
                throw new GraphQLError('username already exists.', err400);
            }
            const isPasswordValid = validatePassword(password);
            if (!isPasswordValid) {
                throw new GraphQLError(
                    'Invalid password. Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
                    err400
                );
            }
            const encryptedpassword = await bcrypt.hash(password, 10);
            const user_id = new ObjectId();
            const newUser: UserInput = {
                _id: user_id,
                name,
                userName,
                email,
                password: encryptedpassword,
                followersCount: 0,
                followingCount: 0,
                token: ''
            };
            try {
                const result = await context.usersCollection.insertOne(newUser);
                console.log(`result variable: ${JSON.stringify(result)}`);
                return result.acknowledged;
            } catch (error: any) {
                if (error.code == 121) {
                    throw new GraphQLError(
                        `DatabaseError: Document failed validation,
                propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                        err400
                    );
                }
                return error;
            }
        },
        // LOGIN USER
        async loginUser(
            _: any,
            { loginInput }: { loginInput: LoginUser },
            context: any
        ): Promise<User> {
            try {
                const { email, password } = loginInput;

                // Check if a user with that email exists
                const userEmail = await context.usersCollection.findOne({
                    email
                });
                // Check if the password is correct
                const isPasswordValid = await bcrypt.compare(
                    password,
                    userEmail.password
                );

                if (!userEmail) {
                    throw error;
                } else if (!isPasswordValid) {
                    throw error;
                }

                // Create a new JWT with user ID and email
                const token = jwt.sign(
                    { user_id: userEmail._id, email: userEmail.email },
                    jwtKey,
                    { expiresIn: '2h' }
                );

                // Update the user with the generated token
                await context.usersCollection.updateOne(
                    { _id: new ObjectId(userEmail._id) },
                    { $set: { token } }
                );

                // Retrieve the updated user with the generated token
                const loggedInUser = await context.usersCollection.findOne({
                    _id: userEmail._id
                });

                return loggedInUser;
            } catch (error) {
                throw new Error(
                    'The email or password you entered is incorrect. Please make sure you have entered the correct credentials and try again.'
                );
            }
        },
        // LOGOUT USER
        async logOut(_: any, __: any, context: any): Promise<boolean> {
            try {
                // Check if the user is authenticated
                if (!context.user) {
                    throw new GraphQLError(
                        'User must log in before logging out.',
                        err401
                    );
                }
                console.log(context.userId);
                // Remove the token from the user in the database
                const removeToken =
                    await context.usersCollection.findOneAndUpdate(
                        { _id: new ObjectId(context.userId) },
                        { $set: { token: '' } } // Unset the token field
                    );
                console.log(removeToken);

                // Return true to indicate successful logout
                return true;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        },
        // EDIT USER
        async editUser(
            _: any,
            { id, editUserInput }: { id: string; editUserInput: UserInput },
            context: any
        ): Promise<boolean> {
            const { name, userName, email, password } = editUserInput;
            const updatedUser: UserInput = {
                name,
                userName,
                email,
                password,
                followersCount: 0,
                followingCount: 0
            };
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to edit this user information',
                        err401
                    );
                }
                const result = await context.usersCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: updatedUser }
                );
                if (result.lastErrorObject.updatedExisting == true) {
                    return result.lastErrorObject.updatedExisting;
                } else {
                    throw new GraphQLError(
                        result.lastErrorObject.updatedExisting
                    );
                }
            } catch (error: any) {
                console.log(error);
                if (error.codeName == 'DocumentValidationFailure') {
                    throw new GraphQLError(
                        `DatabaseError: Document failed validation
                propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                        err400
                    );
                }
                return error;
            }
        },
        // DELETE USER
        async deleteUser(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<boolean> {
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to delete this user',
                        err401
                    );
                }
                const result = await context.usersCollection.deleteOne({
                    _id: new ObjectId(id)
                });
                return result.deletedCount === 1;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        }
    }
};
