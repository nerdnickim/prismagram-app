import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const MainNavigation = createStackNavigator();

export default () => {
	return (
		<NavigationContainer>
			<MainNavigation.Navigator headerMode="none" mode="modal">
				<MainNavigation.Screen name="bottom" children={TabNavigation} />
				<MainNavigation.Screen name="PhotoNavigation" children={PhotoNavigation} />
			</MainNavigation.Navigator>
		</NavigationContainer>
	);
};
