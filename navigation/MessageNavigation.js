import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";

const MessageStackNavi = createStackNavigator();

export default () => {
	return (
		<MessageStackNavi.Navigator>
			<MessageStackNavi.Screen name="messages" component={Messages} />
			<MessageStackNavi.Screen name="message" component={Message} />
		</MessageStackNavi.Navigator>
	);
};
