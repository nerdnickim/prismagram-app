import React, { useLayoutEffect } from "react";
import { TextInput, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../styles";
import { stackStyle } from "./config";

const TextTab = createBottomTabNavigator();

const AddComment = ({ onChange, onSubmit, value }) => {
	return (
		<TextInput
			style={{
				width: 100,
				height: 30,
			}}
			returnKeyType="send"
			onChangeText={onChange}
			onEndEditing={onSubmit}
			value={value}
			placeholder={"Add Comment"}
			placeholderTextColor={styles.darkGreyColor}
			autoCorrect={false}
		/>
	);
};

export default ({ onChange, value, onSubmit }) => {
	return (
		<TextTab.Navigator
			tabBarOptions={{ showLabel: false, style: { ...stackStyle } }}
			tabBarAccessibilityLabel
			tabBar={() => <AddComment onChange={onChange} value={value} onSubmit={onSubmit} />}
		>
			<TextTab.Screen name="CommentInput" component={View} />
		</TextTab.Navigator>
	);
};
