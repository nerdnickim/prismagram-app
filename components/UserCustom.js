import React, { useRef } from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";

const View = styled.View``;

const Touchable = styled.TouchableOpacity`
	padding-right: 10px;
`;

const Button = styled.TouchableOpacity``;

const ListContain = styled.View`
	border-bottom-width: 1;
	padding-top: 10;
	padding-left: 20;
	padding-bottom: 10;
`;

export default ({ username, firstName, lastName }) => {
	const navigation = useNavigation();
	const refRBSheet = useRef();

	const moving = () => {
		navigation.navigate("ProfileOptions", { username, firstName, lastName });
		refRBSheet.current.close();
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
					<Button onPress={moving}>
						<Text style={{ fontSize: 20 }}>Edit Name</Text>
					</Button>
				</ListContain>
			</RBSheet>
		</>
	);
};
