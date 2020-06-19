import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform } from "react-native";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import stackFactory from "./stackFactory";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyle } from "./config";

const TabNavigation = createBottomTabNavigator();

export default () => {
	return (
		<TabNavigation.Navigator
			tabBarOptions={{ showLabel: false, style: { ...stackStyle } }}
			tabBarAccessibilityLabel
		>
			<TabNavigation.Screen
				name="Home"
				component={stackFactory}
				options={{
					tabBarIcon: ({ focused }) => (
						<NavIcon
							focused={focused}
							name={Platform.OS === "ios" ? "ios-home" : "md-home"}
						/>
					),
				}}
				initialParams={{
					initRoute: Home,
					initialConfig: {
						headerTitle: <NavIcon name="logo-instagram" size={36} />,
						headerRight: () => <MessagesLink />,
					},
				}}
			/>
			<TabNavigation.Screen
				name="Search"
				component={stackFactory}
				options={{
					tabBarIcon: ({ focused }) => (
						<NavIcon
							focused={focused}
							name={Platform.OS === "ios" ? "ios-search" : "md-search"}
						/>
					),
				}}
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
				options={{
					tabBarIcon: ({ focused }) => (
						<NavIcon
							focused={focused}
							name={Platform.OS === "ios" ? "ios-add" : "md-add"}
							size={40}
						/>
					),
				}}
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
				options={{
					tabBarIcon: ({ focused }) => (
						<NavIcon
							focused={focused}
							name={
								Platform.OS === "ios"
									? focused
										? "ios-heart"
										: "ios-heart-empty"
									: focused
									? "md-heart"
									: "md-heart-empty"
							}
						/>
					),
				}}
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
				options={{
					tabBarIcon: ({ focused }) => (
						<NavIcon
							focused={focused}
							name={Platform.OS === "ios" ? "ios-person" : "md-person"}
						/>
					),
				}}
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
