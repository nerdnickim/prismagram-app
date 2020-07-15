import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("SendUser")}
			style={{ marginRight: 10 }}
		>
			<AntDesign name="message1" size={24} color="black" />
		</TouchableOpacity>
	);
};
