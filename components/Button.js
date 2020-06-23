import React from "react";
import styled from "styled-components";

const BtnContainer = styled.TouchableOpacity``;

const Text = styled.Text``;

const Button = ({ text, onPress }) => (
	<BtnContainer onPress={onPress}>
		<Text>{text}</Text>
	</BtnContainer>
);

export default Button;
