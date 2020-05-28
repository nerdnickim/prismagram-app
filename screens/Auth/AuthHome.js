import * as React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
	<View>
		<Text>Auth Home</Text>
		<TouchableOpacity onPress={() => navigation.push("Login")}>
			<Text>Go to Login</Text>
		</TouchableOpacity>
		<TouchableOpacity onPress={() => navigation.push("SignUp")}>
			<Text>Go to SignUp</Text>
		</TouchableOpacity>
	</View>
);
