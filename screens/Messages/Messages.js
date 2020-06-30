import * as React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SEE_ROOMS = gql`
	{
		seeRooms {
			id
			messages {
				id
				text
				to {
					username
					avatar
				}
			}
		}
	}
`;

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const ItemView = styled.View`
	margin-top: 40px;
`;

const Text = styled.Text`
	color: white;
`;

const Touchable = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	width: 200;
	padding: 8px 10px;
	background-color: ${(props) => props.theme.blueColor};
	border-radius: 6px;
`;

export default () => {
	const navigation = useNavigation();
	const { data, loading } = useQuery(SEE_ROOMS);

	const DATA = [data?.seeRooms];

	const Item = ({ id, item }) => (
		<ItemView>
			<Touchable
				onPress={() =>
					navigation.navigate("message", { username: item[0].to.username, roomId: id })
				}
			>
				<Text>Message: {item[0].text}</Text>
				<Text>{item[0].to.username}</Text>
			</Touchable>
		</ItemView>
	);

	return (
		<View>
			<FlatList
				data={DATA}
				renderItem={({ item }) => item.map((r) => <Item id={r.id} item={r.messages} />)}
				keyExtractor={(item) => null}
			/>
		</View>
	);
};
