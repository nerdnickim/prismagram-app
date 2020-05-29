import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoNavigator = createMaterialTopTabNavigator();

const StackNavigator = createStackNavigator();

const PhotoTabs = () => {
	return (
		<PhotoNavigator.Navigator tabBarPosition="bottom">
			<PhotoNavigator.Screen name="Select" component={SelectPhoto} />
			<PhotoNavigator.Screen name="Take" component={TakePhoto} />
		</PhotoNavigator.Navigator>
	);
};

export default () => {
	return (
		<StackNavigator.Navigator initialRouteName="Photos">
			<StackNavigator.Screen name="PhotoTabs" children={PhotoTabs} />
			<StackNavigator.Screen name="UploadPhoto" component={UploadPhoto} />
		</StackNavigator.Navigator>
	);
};
