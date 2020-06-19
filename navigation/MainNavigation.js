import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyle } from "./config";
import CommentNavigation from "./CommentNavigation";

const MainNavigation = createStackNavigator();

const RootNavigation = createStackNavigator();

const MainRoot = () => {
	return (
		<MainNavigation.Navigator
			headerMode="none"
			screenOptions={{ headerStyle: { ...stackStyle } }}
			mode="modal"
		>
			<MainNavigation.Screen name="bottom" children={TabNavigation} />
			<MainNavigation.Screen name="PhotoNavigation" children={PhotoNavigation} />
			<MainNavigation.Screen name="MessageNavigation" children={MessageNavigation} />
		</MainNavigation.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer>
			<RootNavigation.Navigator
				headerMode="none"
				screenOptions={{ headerStyle: { ...stackStyle } }}
			>
				<RootNavigation.Screen name="MainRoot" component={MainRoot} />
				<RootNavigation.Screen name="CommentDetail" component={CommentNavigation} />
			</RootNavigation.Navigator>
		</NavigationContainer>
	);
};
