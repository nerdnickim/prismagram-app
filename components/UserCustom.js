import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
	padding-right: 10px;
`;

export default () => {
	const navigation = useNavigation();

	return (
		<Container onPress={() => navigation.navigate("ProfileCustom")}>
			<FontAwesome name="bars" size={24} color="black" />
		</Container>
	);
};
