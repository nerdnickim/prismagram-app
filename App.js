import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import { YellowBox } from "react-native";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";

YellowBox.ignoreWarnings(["Remote debugger"]);

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [client, setClient] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const preLoad = async () => {
		try {
			await Font.loadAsync({
				...Ionicons.font,
			});
			await Asset.loadAsync([require("./assets/logo.png")]);
			const cache = new InMemoryCache();
			await persistCache({
				cache,
				storage: AsyncStorage,
			});

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
				cache,
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

			const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
			if (!isLoggedIn || isLoggedIn === "false") {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
			setLoaded(true);
			setClient(client);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		preLoad();
	}, []);

	return loaded && client && isLoggedIn !== null ? (
		<ApolloProvider client={client}>
			<ThemeProvider theme={styles}>
				<AuthProvider isLoggedIn={isLoggedIn}>
					<NavController />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	) : (
		<AppLoading />
	);
}
