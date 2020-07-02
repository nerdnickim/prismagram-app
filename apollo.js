import { proc } from "react-native-reanimated";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, split, from, concat } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import AsyncStorage from "@react-native-community/async-storage";

export const httpLink = new HttpLink({
	uri: "https://cloneinggram-backend.herokuapp.com",
});

export const wsLink = new WebSocketLink({
	uri: `ws://cloneinggram-backend.herokuapp.com`,
	options: {
		reconnect: true,
	},
});
