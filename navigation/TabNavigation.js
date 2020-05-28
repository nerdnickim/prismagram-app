import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUp from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import { View } from "react-native";

const TabNavigation = createBottomTabNavigator();

export default () => {
	return (
		<NavigationContainer>
			<TabNavigation.Navigator>
				<TabNavigation.Screen name="Good" component={SignUp}></TabNavigation.Screen>
				<TabNavigation.Screen name="AuthHome" component={AuthHome}></TabNavigation.Screen>
				<TabNavigation.Screen name="Add" component={View}></TabNavigation.Screen>
				<TabNavigation.Screen name="Login" component={Login}></TabNavigation.Screen>
				<TabNavigation.Screen name="Confirm" component={Confirm}></TabNavigation.Screen>
			</TabNavigation.Navigator>
		</NavigationContainer>
	);
};
