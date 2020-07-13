import React from "react";
import styled from "styled-components";
import { EDIT_POST } from "../components/PostOptions";
import { useMutation } from "react-apollo-hooks";
import useInput from "../hooks/useInput";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const View = styled.View`
	margin-top: 20px;
	align-items: center;
`;

const Section = styled.View``;

export default ({ route }) => {
	const navigation = useNavigation();
	const { id, location, caption } = route.params;
	const locationInput = useInput("");
	const captionInput = useInput("");
	const [editPostMutation] = useMutation(EDIT_POST, {
		variables: {
			id,
			location: locationInput.value,
			caption: captionInput.value,
			action: "EDIT",
		},
	});

	const editPost = async (e) => {
		e.preventDefault();
		if (locationInput.value !== "" && captionInput.value !== "") {
			const {
				data: { editPost },
			} = await editPostMutation();
			if (editPost) {
				Alert.alert("edit your post");
				navigation.navigate("Home");
			}
		}
	};

	return (
		<View>
			<Section>
				<AuthInput
					value={locationInput.value}
					onChange={(text) => locationInput.onChange(text)}
					placeholder={location}
					autoCorrect={false}
					autoCapitalize="words"
				/>
				<AuthInput
					value={captionInput.value}
					onChange={(text) => captionInput.onChange(text)}
					placeholder={caption}
					autoCorrect={false}
					autoCapitalize="words"
				/>
			</Section>
			<AuthButton loading={false} bgColor={"#2D4DA7"} onPress={editPost} text="Submit" />
		</View>
	);
};
