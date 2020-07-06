import React, { useRef } from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useLogOut } from "../AuthContext";

const View = styled.View``;

const Touchable = styled.TouchableOpacity`
	padding-right: 10px;
`;

const Button = styled.TouchableOpacity``;

const BtnContain = styled.View`
	border-bottom-width: 1;
	padding-top: 10;
	padding-left: 20;
	padding-bottom: 10;
`;

const ListContain = styled.View``;

export default ({ username, firstName, lastName }) => {
	const navigation = useNavigation();
	const refRBSheet = useRef();
	const logOut = useLogOut();

	const moving = () => {
		navigation.navigate("ProfileOptions", { username, firstName, lastName });
		refRBSheet.current.close();
	};

	const logOutHandle = () => {
		logOut();
	};

	return (
		<>
			<Touchable onPress={() => refRBSheet.current.open()}>
				<FontAwesome name="bars" size={24} color="black" />
			</Touchable>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={true}
				openDuration={250}
				animationType="fade"
				customStyles={{
					draggableIcon: {
						backgroundColor: "#000",
					},
					container: {
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
					},
				}}
			>
				<ListContain>
					<BtnContain>
						<Button onPress={moving}>
							<Text style={{ fontSize: 20 }}>Edit Name</Text>
						</Button>
					</BtnContain>
					<BtnContain>
						<Button onPress={logOutHandle}>
							<Text style={{ fontSize: 20 }}>Log Out</Text>
						</Button>
					</BtnContain>
				</ListContain>
			</RBSheet>
		</>
	);
};
