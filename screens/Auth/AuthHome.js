import * as React from "react";
import styled from "styled-components";
import constans from "../../constans";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Image = styled.Image`
	width: ${constans.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
	color: ${(props) => props.theme.blueColor};
	margin-top: 25px;
	font-weight: 600;
`;

export default ({ navigation }) => (
	<View>
		<Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
		<AuthButton text={"Create New Count"} onPress={() => navigation.navigate("SignUp")} />
		<Touchable onPress={() => navigation.navigate("Login")}>
			<LoginLink>
				<LoginLinkText>Login</LoginLinkText>
			</LoginLink>
		</Touchable>
	</View>
);
