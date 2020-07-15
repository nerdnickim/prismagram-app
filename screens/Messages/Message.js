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
	View,
} from "react-native";
import { gql } from "apollo-boost";
import { useMutation, useSubscription } from "react-apollo-hooks";

export const SEND_MESSAGE = gql`
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
			to {
				id
				username
			}
			from {
				id
				username
			}
		}
	}
`;

const Vieww = styled.View`
	flex: 1;
	justify-content: space-between;
	padding: 40px 0;
`;

const FromText = styled.Text`
	margin-bottom: 10px;
	padding: 8px 10px;
	border: 1px solid #326bf9;
	border-radius: 6px;
`;

const ToText = styled.Text`
	margin-bottom: 10px;
	padding: 8px 10px;
	border: 1px solid #a26cf7;
	border-radius: 6px;
`;

const InputContain = styled.View``;

export default ({ route }) => {
	const navigation = useNavigation();
	const { roomId, username, messages: oldMessages, part, toId } = route.params;

	const toPid = toId.filter((t) => (t === null ? null : t));

	const messageInput = useInput("");
	const [mArray, setMArray] = React.useState(oldMessages || []);
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
		fetchPolicy: "network-only",
	});

	const handleMessage = async () => {
		if (loading) {
			console.log("loading");
		}
		if (error) {
			console.log("error");
		}
		if (data) {
			const { newMessage } = await data;
			setMArray((previous) => [...previous, newMessage]);
		}
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
		try {
			await sendMessageMutation();
			messageInput.setValue("");
		} catch (e) {
			console.log(e);
		}
	};

	const keyboardVerticalOffset = Platform.OS === "ios" ? 70 : 0;

	return (
		<Vieww>
			<ScrollView
				style={{
					maxHeight: 460,
				}}
			>
				{part.map((p) =>
					p.isMe === true
						? mArray.map((m) =>
								p.id === m.from.id ? (
									<View key={m.id} style={{ alignSelf: "flex-end", marginRight: 20 }}>
										<FromText> {m.text} </FromText>
									</View>
								) : (
									<View key={m.id} style={{ alignSelf: "flex-start", marginLeft: 20 }}>
										<ToText>{m.text}</ToText>
									</View>
								)
						  )
						: null
				)}
			</ScrollView>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={keyboardVerticalOffset}
				style={{
					alignItems: "center",
				}}
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
		</Vieww>
	);
};
