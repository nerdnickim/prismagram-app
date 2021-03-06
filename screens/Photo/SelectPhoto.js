import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView, TouchableOpacity, Platform } from "react-native";
import constans from "../../constans";
import styles from "../../styles";
import NavIcon from "../../components/NavIcon";

const Header = styled.View`
	position: relative;
`;

const Vieww = styled.View`
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

const Photos = styled.TouchableOpacity`
	position: absolute;
	top: 290px;
	right: 10px;
`;

const Circle = styled.View`
	width: 25px;
	height: 25px;
`;

export default ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [hasPermission, setHasPermission] = useState(false);
	const [selected, setSelected] = useState();
	const [selects, setSelects] = useState(selected || []);
	const [allPhotos, setAllPhotos] = useState();
	let [focused, setFocued] = useState(false);

	const changeSelectedPhoto = (photo) => {
		if (focused === true) {
			setSelects([...selects, photo]);
			if ((selects.map((i) => i).indexOf(photo) !== -1) === true) {
				const pop = selects.filter((i) => i !== photo);
				setSelects(pop);
			}
		}
		if (focused === false) {
			setSelected(photo);
		}
	};

	const changeFocued = () => {
		setFocued((f) => !f);
		setSelects([selected]);
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
		navigation.navigate("UploadPhoto", { photo: focused ? selects : selected, focused });
	};
	useEffect(() => {
		askPermission();
	}, []);
	return (
		<Vieww>
			{loading ? (
				<Loader />
			) : (
				<Vieww>
					{hasPermission ? (
						<>
							<Header>
								<Image
									style={{ width: constans.width, height: constans.height / 2 }}
									source={
										focused === true
											? selects.length === 0
												? { uri: "null" }
												: { uri: selects[selects.length - 1].uri }
											: { uri: selected.uri }
									}
								/>

								<Button onPress={handleSelected}>
									<Text>Upload</Text>
								</Button>

								<Photos onPress={changeFocued}>
									<NavIcon
										name={Platform.OS === "ios" ? "ios-photos" : "md-photos"}
										size={24}
										color={focused ? `${styles.blueColor}` : "black"}
									/>
								</Photos>
							</Header>

							<ScrollView
								contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
							>
								{allPhotos.map((photo) => {
									return (
										<TouchableOpacity
											key={photo.id}
											onPress={() => {
												changeSelectedPhoto(photo);
											}}
										>
											<Image
												style={{
													width: constans.width / 3,
													height: constans.height / 6,
													opacity:
														focused === true
															? selects.map((i) => i.id).indexOf(photo.id) !== -1
																? 0.5
																: 1
															: photo.id === selected.id
															? 0.5
															: 1,
												}}
												source={{ uri: photo.uri }}
											/>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
						</>
					) : null}
				</Vieww>
			)}
		</Vieww>
	);
};
