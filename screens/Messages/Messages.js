import * as React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";

const SEE_ROOMS = gql`
	{
		seeRooms {
			id
			participants {
				isMe
				id
				username
			}
			messages {
				id
				text
				to {
					id
					username
				}
				from {
					id
					username
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
	const { data, loading } = useQuery(SEE_ROOMS, {
		fetchPolicy: "network-only",
	});

	const DATA = [data?.seeRooms];
	const Item = ({ id, item, part }) => {
		return (
			<ItemView>
				<Touchable
					onPress={() =>
						navigation.navigate("message", {
							username: part.map((a) => (a.isMe === false ? a.username : null)),
							roomId: id,
							messages: item,
							part,
							toId: part.map((a) => (a.isMe === false ? a.id : null)),
						})
					}
				>
					<Text>Message</Text>
					<Text>{part.map((a) => (a.isMe === false ? a.username : null))}</Text>
				</Touchable>
			</ItemView>
		);
	};

	return loading ? (
		<Loader />
	) : (
		<View>
			<FlatList
				data={DATA}
				renderItem={({ item }) =>
					item?.map((r) => <Item id={r.id} item={r.messages} part={r.participants} />)
				}
				keyExtractor={(item) => null}
			/>
		</View>
	);
};
