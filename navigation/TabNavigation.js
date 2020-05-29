import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import stackFactory from "./stackFactory";
import { TouchableOpacity } from "react-native-gesture-handler";

const TabNavigation = createBottomTabNavigator();

export default () => {
	return (
		<TabNavigation.Navigator>
			<TabNavigation.Screen
				name="Home"
				component={stackFactory}
				initialParams={{
					initRoute: Home,
					initialConfig: {
						title: "Home",
						headerRight: () => (
							<TouchableOpacity>
								<Text>Hi</Text>
							</TouchableOpacity>
						),
					},
				}}
			/>
			<TabNavigation.Screen
				name="Search"
				component={stackFactory}
				initialParams={{
					initRoute: Search,
					initialConfig: {
						title: "Search",
					},
				}}
			/>
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
			<TabNavigation.Screen
				name="Notifications"
				component={stackFactory}
				initialParams={{
					initRoute: Notifications,
					initialConfig: {
						title: "Notifications",
					},
				}}
			/>
			<TabNavigation.Screen
				name="Profile"
				component={stackFactory}
				initialParams={{
					initRoute: Profile,
					initialConfig: {
						title: "Profile",
					},
				}}
			/>
		</TabNavigation.Navigator>
	);
};
