import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommentDetail from "../screens/CommentDetail";

const CommentStack = createStackNavigator();

export default ({ route }) => {
	console.log(route);

	return (
		<CommentStack.Navigator>
			<CommentStack.Screen name="aaa" component={CommentDetail} />
		</CommentStack.Navigator>
	);
};
