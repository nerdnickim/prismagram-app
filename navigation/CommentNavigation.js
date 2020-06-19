import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommentDetail from "../screens/CommentDetail";

const CommentStack = createStackNavigator();

export default ({ route }) => {
	return (
		<CommentStack.Navigator>
			<CommentStack.Screen
				name="CommentNavigation"
				component={CommentDetail}
				initialParams={{
					id: route.params.id,
					username: route.params.username,
				}}
			/>
		</CommentStack.Navigator>
	);
};
