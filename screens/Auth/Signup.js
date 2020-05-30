import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default ({ navigation, route }) => {
	const fNameInput = useInput("");
	const lNameInput = useInput("");
	const uNameInput = useInput("");
	const emailInput = useInput(() => {
		if (route.params === undefined) {
			return "";
		} else if (route.params.email) {
			return route.params.email;
		}
	});
	const [loading, setLoading] = useState(false);
	const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: uNameInput.value,
			email: emailInput.value,
			firstName: fNameInput.value,
			lastName: lNameInput.value,
		},
	});

	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const handleSignUp = async () => {
		const { value: fName } = fNameInput;
		const { value: lName } = lNameInput;
		const { value: uName } = uNameInput;
		const { value: email } = emailInput;

		if (!emailRegex.test(email)) {
			return Alert.alert("That email is invalid");
		}
		if (fName === "" || lName === "") {
			return Alert.alert("I need your name");
		}

		if (uName === "") {
			return Alert.alert("I need your username");
		}
		try {
			setLoading(true);
			const {
				data: { createAccount },
			} = await createAccountMutation();
			if (createAccount) {
				Alert.alert("Account created!");
				navigation.navigate("Login", { email });
			}
		} catch (e) {
			Alert.alert("Username taken", "Log in instead");
			navigation.navigate("Login", { email });
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...fNameInput}
					placeholder="First Name"
					autoCorrect={false}
					autoCapitalize="words"
				/>
				<AuthInput
					{...lNameInput}
					placeholder="Last Name"
					autoCorrect={false}
					autoCapitalize="words"
				/>
				<AuthInput
					{...uNameInput}
					placeholder="Username"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthInput
					{...emailInput}
					placeholder="Email"
					keyboardType="email-address"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthButton loading={loading} onPress={handleSignUp} text="Sign Up" />
			</View>
		</TouchableWithoutFeedback>
	);
};
