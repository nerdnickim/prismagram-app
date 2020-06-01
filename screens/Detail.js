import React from "react";
import styled from "styled-components";

const View = styled.View``;

const Text = styled.Text``;

export default ({ route }) => (
	<View>
		<Text>Photo{console.log(route.params.id)}</Text>
	</View>
);
