import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileOptions from "../screens/ProfileDetail/ProfileOptions";

const Profile = createStackNavigator();

export default () => {
	return (
		<Profile.Navigator
			mode="modal"
			headerMode="none"
			screenOptions={{ cardStyle: { backgroundColor: "transparent" } }}
		>
			<Profile.Screen name="ProfileCustom" component={ProfileOptions} />
		</Profile.Navigator>
	);
};
