import * as React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

const View = styled.View``;

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

export default () => {
	const navigation = useNavigation();
	return (
		<Container onPress={() => navigation.navigate("MessageNavigation")}>
			<Text>Messages</Text>
		</Container>
	);
};
