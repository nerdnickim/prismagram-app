import * as React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { gql } from "apollo-boost";
import { useMutation, useSubscription } from "react-apollo-hooks";

const SEND_MESSAGE = gql`
	mutation sendMessage($roomId: String, $message: String!, $toId: String!) {
		sendMessage(roomId: $roomId, message: $message, toId: $toId) {
			id
			text
		}
	}
`;

const NEW_MESSAGE = gql`
	subscription newMessage($roomId: String!) {
		newMessage(roomId: $roomId) {
			id
			text
		}
	}
`;

const View = styled.View`
	flex: 1;
	justify-content: space-between;
	padding: 40px 0;
	align-items: center;
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

const InputContain = styled.View``;

export default ({ route }) => {
	const navigation = useNavigation();
	const { roomId, username, messages, part, toId } = route.params;

	const toPid = toId.filter((t) => (t === null ? null : t));

	const messageInput = useInput("");
	const [Smessages, setSMessages] = React.useState();
	const [selfMessage, setSelfMessage] = React.useState([]);
	const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
		variables: {
			roomId,
			message: messageInput.value,
			toId: toPid[0],
		},
	});

	const { data, loading, error } = useSubscription(NEW_MESSAGE, {
		variables: {
			roomId,
		},
	});

	const handleMessage = () => {
		if (loading) {
			console.log("loading");
		}
		if (error) {
			console.log("error");
		}
		console.log(data);
	};

	React.useEffect(() => {
		handleMessage();
		navigation.setOptions({
			headerTitle: username,
		});
	}, [data]);

	const onsubmit = async (e) => {
		e.preventDefault();
		if (messageInput.value === "") {
			return;
		}
		const {
			data: { sendMessage },
		} = await sendMessageMutation();
		setSelfMessage([...selfMessage, sendMessage]);
		messageInput.setValue("");
	};

	const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

	return (
		<View>
			<ScrollView
				style={{
					maxHeight: 460,
				}}
			>
				<TextContain>
					{part.map((p) =>
						p.isMe === true
							? messages.map((m) =>
									p.id === m.from.id ? (
										<FromText key={m.id}> {m.text} </FromText>
									) : (
										<ToText key={m.id}>{m.text}</ToText>
									)
							  )
							: null
					)}
					{selfMessage.map((t) => (
						<FromText key={t.id}>{t.text}</FromText>
					))}
				</TextContain>
			</ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={keyboardVerticalOffset}
			>
				<InputContain>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<AuthInput
							{...messageInput}
							placeholder={"Send to message"}
							returnKeyType="send"
							autoCorrect={false}
							onSubmitEditing={onsubmit}
						/>
					</TouchableWithoutFeedback>
				</InputContain>
			</KeyboardAvoidingView>
		</View>
	);
};
