import {
    ApolloClient,
    ApolloLink,
    from,
    HttpLink,
    InMemoryCache
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: 'http://localhost:7000/' });

// Read the token from localStorage
const token = localStorage.getItem('token');
const authMiddleware = new ApolloLink((operation, forward) => {
    // Add the authorization header if the token exists
    if (token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }
    return forward(operation);
});

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, ...details }) =>
            console.log(`GraphQL Error: Message: ${message}`, details)
        );
    }

    if (networkError) {
        console.log('Network Error: ', networkError);
    }
});

export const client = new ApolloClient({
    //httpLink MUST be the last in the array otherwise it won't work
    cache: new InMemoryCache(),
    link: from([authMiddleware, errorMiddleware, httpLink]),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore'
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
        }
    }
});
