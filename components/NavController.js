import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";

import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

export default () => {
	const isLoggedIn = useIsLoggedIn();
	const logIn = useLogIn();
	const logOut = useLogOut();
	return (
		<View style={{ flex: "1" }}>
			{isLoggedIn ? (
				<TouchableOpacity onPress={logOut}>
					<Text>Log Out</Text>
				</TouchableOpacity>
			) : (
				<SafeAreaProvider>
					<AuthNavigation />
				</SafeAreaProvider>
			)}
		</View>
	);
};
