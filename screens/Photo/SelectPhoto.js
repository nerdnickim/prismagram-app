import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import constans from "../../constans";
import styles from "../../styles";

const View = styled.View`
	flex: 1;
`;

const Button = styled.TouchableOpacity`
	width: 100px;
	height: 30px;
	background-color: ${styles.blueColor};
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	position: absolute;
	right: 10px;
	top: 10px;
`;

const Text = styled.Text`
	color: white;
`;

export default ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [hasPermission, setHasPermission] = useState(false);
	const [selected, setSelected] = useState();
	const [allPhotos, setAllPhotos] = useState();
	const changeSelectedPhoto = (photo) => {
		setSelected(photo);
	};
	const getPhotos = async () => {
		try {
			const { assets } = await MediaLibrary.getAssetsAsync();
			const [firstPhoto] = assets;
			setSelected(firstPhoto);
			setAllPhotos(assets);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	const askPermission = async () => {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status === "granted") {
				setHasPermission(true);
				getPhotos();
			}
		} catch (e) {
			console.log(e);
			setHasPermission(false);
		}
	};
	const handleSelected = () => {
		navigation.navigate("UploadPhoto", { photo: selected });
	};
	useEffect(() => {
		askPermission();
	}, []);
	return (
		<View>
			{loading ? (
				<Loader />
			) : (
				<View>
					{hasPermission ? (
						<>
							<Image
								style={{ width: constans.width, height: constans.height / 2 }}
								source={{ uri: selected.uri }}
							/>
							<Button onPress={handleSelected}>
								<Text>Upload</Text>
							</Button>

							<ScrollView contentContainerStyle={{ flexDirection: "row" }}>
								{allPhotos.map((photo) => (
									<TouchableOpacity
										key={photo.id}
										onPress={() => changeSelectedPhoto(photo)}
									>
										<Image
											style={{
												width: constans.width / 3,
												height: constans.height / 6,
												opacity: photo.id === selected.id ? 0.5 : 1,
											}}
											source={{ uri: photo.uri }}
										/>
									</TouchableOpacity>
								))}
							</ScrollView>
						</>
					) : null}
				</View>
			)}
		</View>
	);
};
