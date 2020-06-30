import * as React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ route }) => {
	const navigation = useNavigation();
	const { roomId, username } = route.params;
	console.log(roomId, username);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: username,
		});
	}, []);
	return (
		<View>
			<Text>Message</Text>
		</View>
	);
};
