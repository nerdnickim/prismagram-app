import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { gql } from "apollo-boost";
import { Image, Alert } from "react-native";
import constans from "../../constans";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../../sharedQueries";

const UPLOAD = gql`
	mutation upload($caption: String!, $files: [String!]!, $location: String) {
		upload(caption: $caption, files: $files, location: $location) {
			id
			location
			caption
		}
	}
`;

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

export default ({ route, navigation }) => {
	const [loading, setLoading] = React.useState(false);
	const photoS = route.params.photo;
	const captionInput = useInput("");
	const locationInput = useInput("");

	const [uploadMutation] = useMutation(UPLOAD, {
		refetchQueries: () => [{ query: FEED_QUERY }],
	});

	const handleSubmit = async () => {
		if (captionInput.value === "" || locationInput.value === "") {
			Alert.alert("All fields are required ");
		}
		const formData = new FormData();
		const name = photoS.filename;
		const [, type] = name.split(".");
		formData.append("file", {
			name: name,
			type: type.toLowerCase(),
			uri: photoS.uri,
		});
		try {
			setLoading(true);
			const {
				data: { location },
			} = await axios.post("http://localhost:4000/api/upload", formData, {
				headers: {
					"content-type": "multipart/form-data",
				},
			});

			const {
				data: { upload },
			} = await uploadMutation({
				variables: {
					caption: captionInput.value,
					location: locationInput.value,
					files: [location],
				},
			});
			if (upload.id) {
				navigation.navigate("bottom");
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Cant upload, try later");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<Container>
				<Image
					style={{ width: constans.width / 4, height: constans.height / 8 }}
					source={{ uri: photoS.uri }}
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
				<Button onPress={handleSubmit}>
					<Text>Upload</Text>
				</Button>
			</Container>
		</View>
	);
};
