import * as React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { FlatList, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Loader from "../../components/Loader";
import SendMessage from "../../components/SendMessage";

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
	const { data, loading, refetch } = useQuery(SEE_ROOMS, {
		fetchPolicy: "network-only",
	});

	const refetchHandle = async () => {
		navigation.addListener("focus", () => {
			refetch();
		});
	};

	const DATA = data?.seeRooms.map((s) => {
		return {
			id: s.id,
			item: s.messages,
			part: s.participants,
		};
	});
	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => <SendMessage />,
		});
		refetchHandle();
	}, []);
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
				focusable={true}
				data={DATA}
				renderItem={({ item }) => <Item id={item.id} item={item.item} part={item.part} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};
