import React from "react";
import styled from "styled-components";
import { Text, Alert } from "react-native";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../hooks/useInput";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";

export default ({ route }) => {
	const { username, firstName, lastName } = route.params;

	const customUsername = useInput("");
	const customFirstName = useInput("");
	const customLastName = useInput("");

	const EDIT_PROFILE = gql`
		mutation editUser(
			$username: String
			$firstName: String
			$lastName: String
			$avatar: String
		) {
			editUser(
				username: $username
				firstName: $firstName
				lastName: $lastName
				avatar: $avatar
			) {
				id
				username
				firstName
				lastName
				fullName
			}
		}
	`;

	const [editProfileMutation] = useMutation(EDIT_PROFILE, {
		variables: {
			username: customUsername.value,
			firstName: customFirstName.value,
			lastName: customLastName.value,
		},
	});

	const submitName = async (e) => {
		e.preventDefault();
		if (
			customUsername.value !== "" &&
			customFirstName.value !== "" &&
			customLastName.value !== ""
		) {
			const {
				data: { editUser },
			} = await editProfileMutation();
			if (editUser) {
				Alert.alert("Confirm your profile");
			}
		}
	};

	const View = styled.View`
		margin-top: 20px;
		align-items: center;
	`;

	const Section = styled.View``;

	return (
		<View>
			<Section>
				<AuthInput
					value={customUsername.value}
					onChange={(text) => customUsername.onChange(text)}
					placeholder={username}
					autoCorrect={false}
					autoCapitalize="words"
				/>
			</Section>
			<Section>
				<AuthInput
					{...customFirstName}
					placeholder={firstName}
					autoCorrect={false}
					autoCapitalize="words"
				/>
			</Section>
			<Section>
				<AuthInput
					{...customLastName}
					placeholder={lastName}
					autoCorrect={false}
					autoCapitalize="words"
				/>
			</Section>
			<AuthButton
				loading={false}
				bgColor={"#2D4DA7"}
				onPress={submitName}
				text="Submit"
			/>
		</View>
	);
};
