import { NextContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface MyNextContext extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
