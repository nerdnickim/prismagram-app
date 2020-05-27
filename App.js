import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { AppLoading, Font, Asset } from "expo";

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const preLoad = async () => {
		try {
			await Font.loadAsync({
				...Ionicons.font,
			});
			await Asset.loadAsync(require("./assets/logo.png"));
			setLoaded(true);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		preLoad;
	}, []);
	return loaded ? (
		<View>
			<Text>Open up App.js to start working on your app!</Text>
		</View>
	) : (
		<AppLoading />
	);
}
