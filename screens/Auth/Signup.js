import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const BtnContainer = styled.View`
	margin-top: 30px;
	padding-top: 30px;
	border-top-width: 1px;
	border-style: solid;
	border-top-color: ${(props) => props.theme.lightGreyColor};
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

	const fbLogin = async () => {
		try {
			setLoading(true);
			await Facebook.initializeAsync("261762595181930");
			const { type, token } = await Facebook.logInWithReadPermissionsAsync({
				permissions: ["public_profile", "email"],
			});
			if (type === "success") {
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
				);
				const { email, first_name, last_name } = await response.json();
				updateFormData(first_name, last_name, email);
				setLoading(false);
			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		}
	};

	const googleLogin = async () => {
		try {
			setLoading(true);
			const result = await Google.logInAsync({
				androidClientId:
					"846237737466-vgku9r4rled5b95fnd4naj6h8u6r936v.apps.googleusercontent.com",
				iosClientId:
					"846237737466-eef0p85q3v7i41v4hleco3kajbtg2s0s.apps.googleusercontent.com",
				scopes: ["profile", "email"],
			});

			if (result.type === "success") {
				const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
					headers: { Authorization: `Bearer ${result.accessToken}` },
				});
				const data = await user.json();

				updateFormData(data.family_name, data.given_name, data.email);
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		} finally {
			setLoading(false);
		}
	};

	const updateFormData = (firstName, lastName, email) => {
		fNameInput.setValue(firstName);
		lNameInput.setValue(lastName);
		emailInput.setValue(email);
		const [username] = email.split("@");
		uNameInput.setValue(username);
	};

	return (
		<>
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
					<BtnContainer>
						<AuthButton
							loading={false}
							bgColor={"#2D4DA7"}
							onPress={fbLogin}
							text="Connect Facebook"
						/>
						<AuthButton
							loading={false}
							bgColor={"#EE1922"}
							onPress={googleLogin}
							text="Connect Google"
						/>
					</BtnContainer>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};
