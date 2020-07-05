import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import { YellowBox } from "react-native";
import NavController from "./components/NavController";
import styles from "./styles";
import { AuthProvider } from "./AuthContext";
import client from "./apollo";

YellowBox.ignoreWarnings(["Remote debugger"]);

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [clientS, setClientS] = useState(null);
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

			const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
			if (!isLoggedIn || isLoggedIn === "false") {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
			setLoaded(true);
			setClientS(client);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		preLoad();
	}, []);

	return loaded && clientS && isLoggedIn !== null ? (
		<ApolloProvider client={clientS}>
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
