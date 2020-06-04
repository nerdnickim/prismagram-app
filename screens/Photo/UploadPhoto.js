import * as React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import constans from "../../constans";
import useInput from "../../hooks/useInput";
import styles from "../../styles";

const View = styled.View`
	flex: 1;
`;

const Text = styled.Text`
	color: white;
	font-weight: 600;
`;

const Container = styled.View`
	flex-direction: row;
	padding: 20px;
`;

const Form = styled.View`
	justify-content: flex-start;
	margin-left: 10px;
`;

const STextInput = styled.TextInput`
	margin-bottom: 10px;
	border: 0px solid ${styles.lightGreyColor};
	border-bottom-width: 1px;
	padding-bottom: 10px;
	width: ${constans.width - 180};
`;

const Button = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
`;

export default ({ route }) => {
	const captionInput = useInput("");
	const locationInput = useInput("");
	return (
		<View>
			<Container>
				<Image
					style={{ width: constans.width / 4, height: constans.height / 8 }}
					source={{ uri: route.params.photo.uri }}
				/>
				<Form>
					<STextInput
						onChangeText={captionInput.onChange}
						value={captionInput.value}
						placeholder="Caption"
						multiline={true}
					/>
					<STextInput
						onChangeText={locationInput.onChange}
						value={locationInput.value}
						placeholder="Location"
						multiline={true}
					/>
				</Form>
				<Button onPress={() => null}>
					<Text>Upload</Text>
				</Button>
			</Container>
		</View>
	);
};
