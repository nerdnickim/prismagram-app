import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyle } from "./config";

const StackFactory = createStackNavigator();

export default ({ route }) => {
	const { initRoute, initialConfig } = route.params;

	return (
		<StackFactory.Navigator
			screenOptions={{
				headerStyle: { ...stackStyle },
				cardStyle: { backgroundColor: "white" },
			}}
		>
			<StackFactory.Screen
				name={route.name}
				component={initRoute}
				options={initialConfig}
			/>
		</StackFactory.Navigator>
	);
};
