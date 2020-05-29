import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";

const StackFactory = createStackNavigator();

export default ({ route }) => {
	const { initRoute, initialConfig } = route.params;

	return (
		<StackFactory.Navigator>
			<StackFactory.Screen
				name={route.name}
				component={initRoute}
				options={initialConfig}
			/>
		</StackFactory.Navigator>
	);
};
