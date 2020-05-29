import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import PhotoNavigation from "./PhotoNavigation";

const TabNavigation = createBottomTabNavigator();

export default () => {
	return (
		<TabNavigation.Navigator>
			<TabNavigation.Screen name="Home" component={Home} />
			<TabNavigation.Screen name="Search" component={Search} />
			<TabNavigation.Screen
				name="Add"
				component={View}
				listeners={({ navigation }) => ({
					tabPress: (e) => {
						e.preventDefault();
						navigation.navigate("PhotoNavigation");
					},
				})}
			/>
			<TabNavigation.Screen name="Notifications" component={Notifications} />
			<TabNavigation.Screen name="Profile" component={Profile} />
		</TabNavigation.Navigator>
	);
};
