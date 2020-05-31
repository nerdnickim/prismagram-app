import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyle } from "./config";
import styles from "../styles";

const MessageStackNavi = createStackNavigator();

export default () => {
	return (
		<MessageStackNavi.Navigator
			screenOptions={{
				headerStyle: { ...stackStyle },
				cardStyle: { backgroundColor: "white" },
			}}
		>
			<MessageStackNavi.Screen name="messages" component={Messages} />
			<MessageStackNavi.Screen name="message" component={Message} />
		</MessageStackNavi.Navigator>
	);
};
