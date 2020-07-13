import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

export const EDIT_POST = gql`
	mutation editPost(
		$id: String!
		$caption: String
		$location: String
		$action: ACTIONS!
	) {
		editPost(id: $id, caption: $caption, location: $location, action: $action) {
			id
			location
			caption
		}
	}
`;

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

export default ({ id, location, caption, userId }) => {
	const navigation = useNavigation();
	const refRBSheet = useRef();
	const [editPostMutation, { loading }] = useMutation(EDIT_POST, {
		variables: { id, action: "DELETE" },
	});

	const editPost = () => {
		navigation.navigate("PostEdit", { id, location, caption });
		refRBSheet.current.close();
	};

	const deletePost = (e) => {
		e.preventDefault();
		try {
			Alert.alert("Delete Post", "Do you want to delete post?", [
				{
					text: "Yes",
					onPress: async () => {
						const {
							data: { editPost },
						} = await editPostMutation();

						if (editPost) {
							refRBSheet.current.close();
							navigation.navigate("Home");
						}
					},
				},
				{ text: "Cancle" },
			]);
		} catch (e) {
			console.log(e);
		}
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
						<Button onPress={editPost}>
							<Text style={{ fontSize: 20 }}>Edit Post</Text>
						</Button>
					</BtnContain>
					<BtnContain>
						<Button onPress={deletePost}>
							<Text style={{ fontSize: 20 }}>Delete Post</Text>
						</Button>
					</BtnContain>
				</ListContain>
			</RBSheet>
		</>
	);
};
