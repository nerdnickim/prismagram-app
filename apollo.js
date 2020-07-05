import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

const authLink = setContext(async (_, { headers }) => {
	const token = await AsyncStorage.getItem("jwt");

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : console.log("hey"),
		},
	};
});

const httpLink = new HttpLink({
	uri: "https://cloneinggram-backend.herokuapp.com",
});

const wsLink = new WebSocketLink({
	uri: `ws://cloneinggram-backend.herokuapp.com`,
	options: {
		reconnect: true,
	},
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([
		authLink,
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			httpLink
		),
	]),
});

export default client;
