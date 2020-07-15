import React from "react";
import { Text, FlatList } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from "../../sharedQueries";
import Loader from "../../components/Loader";
import { SEND_MESSAGE } from "./Message";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

const Touchable = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	width: 200;
	padding: 8px 10px;
	background-color: ${(props) => props.theme.blueColor};
	border-radius: 8px;
	margin-bottom: 20px;
`;

export default () => {
	const navigation = useNavigation();
	const { data, loading } = useQuery(ME);
	const [sendMessageMutation] = useMutation(SEND_MESSAGE);

	const messageHandle = async (id) => {
		const { data } = await sendMessageMutation({
			variables: {
				toId: id,
				message: "",
			},
		});
		if (data) {
			navigation.navigate("messages");
		}
	};

	const DATA = [data?.me?.following];

	const renderItem = ({ item }) =>
		item.map((u) => (
			<Touchable onPress={() => messageHandle(u.id)} key={u.id}>
				<Text style={{ color: "white" }}>{u.username}</Text>
			</Touchable>
		));
	return loading ? (
		<Loader />
	) : (
		<FlatList
			refreshing={true}
			data={DATA}
			renderItem={renderItem}
			keyExtractor={(item) => null}
			contentContainerStyle={{ alignSelf: "center" }}
			style={{ marginTop: 40 }}
		/>
	);
};
