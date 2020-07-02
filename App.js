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
import { setContext } from "apollo-link-context";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import { YellowBox } from "react-native";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";
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

			const authLink = setContext((_, { headers }) => {
				const token = AsyncStorage.getItem("jwt");
				console.log(headers);
				return {
					headers: {
						...headers,
						Authorization: token ? `/Bearer ${token}` : console.log("hey"),
					},
				};
			});

			const httpLink = createHttpLink({
				uri: "https://cloneinggram-backend.herokuapp.com",
			});

			const client = new ApolloClient({
				cache,
				link: authLink.concat(httpLink),
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
