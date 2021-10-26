import {from} from '@apollo/client'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

const KUMPARAN_BASE_URL =
 'https://apollo-fullstack-tutorial.herokuapp.com/';
 
const apolloClient = () => {
 const link = new HttpLink({
   uri: KUMPARAN_BASE_URL,
 });
 
 return new ApolloClient({
   link: from([link]),
   cache: new InMemoryCache(),
 });
};
export default apolloClient;