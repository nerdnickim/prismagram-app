import * as React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const TextContain = styled.View`
	width: 300;
`;

const FromText = styled.Text`
	text-align: right;
	margin-bottom: 10px;
`;

const ToText = styled.Text`
	text-align: left;
	margin-bottom: 10px;
`;

const InputContain = styled.View`
	position: absolute;
	bottom: 20;
`;

export default ({ route }) => {
	const navigation = useNavigation();
	const { roomId, username, messages, part } = route.params;
	const messageInput = useInput("");

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: username,
		});
	}, []);
	return (
		<View>
			<TextContain>
				{part.map((p) =>
					p.isMe === true
						? messages.map((m) =>
								p.id === m.from.id ? (
									<FromText> {m.text} </FromText>
								) : (
									<ToText>{m.text}</ToText>
								)
						  )
						: null
				)}
			</TextContain>
			<InputContain>
				<AuthInput {...messageInput} placeholder={"Send to message"} />
			</InputContain>
		</View>
	);
};
