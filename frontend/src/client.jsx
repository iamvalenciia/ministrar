import {
  ApolloClient,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: "http://localhost:7000/" });
// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       authorization: `Bearer ${localStorage.token}` || "",
//     },
//   });
//   return forward(operation);
// });
const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, ...details }) =>
      console.log(`GraphQL Error: Message: ${message}`, details)
    );
  }

  if (networkError) {
    console.log("Network Error: ", networkError);
  }
});
export const client = new ApolloClient({
  //httpLink MUST be the last in the array otherwise it won't work
  cache: new InMemoryCache(),
  link: from([/*authMiddleware,*/ errorMiddleware, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});
