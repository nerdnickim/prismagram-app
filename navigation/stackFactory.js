import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyle } from "./config";
import Detail from "../screens/Detail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const StackFactory = createStackNavigator();

export default ({ route }) => {
	const { initRoute, initialConfig } = route.params;

	return (
		<StackFactory.Navigator
			screenOptions={{
				headerStyle: { ...stackStyle },
				cardStyle: { backgroundColor: "white" },
				headerBackTitle: null,
			}}
		>
			<StackFactory.Screen
				name={route.name}
				component={initRoute}
				options={initialConfig}
			/>
			<StackFactory.Screen
				name="Detail"
				children={Detail}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: styles.blackColor,
				}}
			/>
			<StackFactory.Screen
				name="UserDetail"
				children={UserDetail}
				options={{
					headerBackTitleVisible: false,
					headerTintColor: styles.blackColor,
				}}
			/>
		</StackFactory.Navigator>
	);
};
