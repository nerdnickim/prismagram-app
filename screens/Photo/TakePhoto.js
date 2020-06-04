import * as React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constans from "../../constans";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styles from "../../styles";
import * as MediaLibrary from "expo-media-library";

const View = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Button = styled.View`
	width: 70px;
	height: 70px;
	border-radius: 50px;
	border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
	const cameraRef = React.useRef();
	const [canTakePhoto, setCanTakePhoto] = React.useState(true);
	const [loading, setLoading] = React.useState(true);
	const [hasPermission, setHasPermission] = React.useState(false);
	const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
	const takePhoto = async () => {
		if (!canTakePhoto) {
			return;
		}
		try {
			setCanTakePhoto(false);
			const { uri } = await cameraRef.current.takePictureAsync({
				quality: 1,
			});
			const asset = await MediaLibrary.createAssetAsync(uri);
			navigation.navigate("UploadPhoto", { photo: asset });
		} catch (e) {
			console.log(e);
			setCanTakePhoto(true);
		}
	};
	const askPermission = async () => {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			if (status === "granted") {
				setHasPermission(true);
			}
		} catch (e) {
			console.log(e);
			setHasPermission(false);
		} finally {
			setLoading(false);
		}
	};
	const toggleType = () => {
		if (cameraType === Camera.Constants.Type.back) {
			setCameraType(Camera.Constants.Type.front);
		} else {
			setCameraType(Camera.Constants.Type.back);
		}
	};
	React.useEffect(() => {
		askPermission();
	}, []);
	return (
		<View>
			{loading ? (
				<Loader />
			) : hasPermission ? (
				<>
					<Camera
						ref={cameraRef}
						type={cameraType}
						style={{
							width: constans.width,
							height: constans.height / 2,
							justifyContent: "flex-end",
							padding: 15,
						}}
					>
						<TouchableOpacity onPress={toggleType}>
							<Ionicons
								name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"}
								size={28}
								color={styles.blackColor}
							/>
						</TouchableOpacity>
					</Camera>
					<View>
						<TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
							<Button />
						</TouchableOpacity>
					</View>
				</>
			) : null}
		</View>
	);
};
