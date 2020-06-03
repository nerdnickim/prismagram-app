import * as React from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image } from "react-native";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default () => {
	const [loading, setLoading] = React.useState(true);
	const [hasPermission, setHasPermission] = React.useState(false);
	const [selected, setSelected] = React.useState();
	const [allPhotos, setAllPhotos] = React.useState();
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
			hasPermission(false);
		} finally {
			setLoading(false);
		}
	};
	React.useEffect(() => {
		askPermission();
	}, []);
	return (
		<View>
			{loading ? (
				<Loader />
			) : (
				<View>
					{hasPermission ? (
						<Image style={{ width: 100, height: 100 }} source={{ uri: selected.uri }} />
					) : null}
				</View>
			)}
		</View>
	);
};
