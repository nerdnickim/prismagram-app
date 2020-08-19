import * as React from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../sharedQueries";
import Loader from "../../components/Loader";

const View = styled.View``;

const ItemView = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 8px 10px;
`;

const Text = styled.Text`
	align-items: center;
	margin: 0 3px;
`;

export default ({ navigation }) => {
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = () => {
		try {
			setRefreshing(true);
			refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};
	const { data, loading, refetch } = useQuery(ME);

	const Item = ({ user }) => {
		const username = user.username;
		return (
			<ItemView>
				<TouchableOpacity
					onPress={() => navigation.navigate("UserDetail", { username })}
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<Image
						style={{ width: 30, height: 30, borderRadius: 20 }}
						source={{ uri: user.avatar }}
					/>
					<Text>{username}</Text>
				</TouchableOpacity>
				<View>
					<Text>님이 회원님의 게시물을 좋아합니다</Text>
				</View>
			</ItemView>
		);
	};

	return (
		<View>
			{loading ? (
				<Loader />
			) : (
				data?.me && (
					<FlatList
						refreshing={refreshing}
						onRefresh={onRefresh}
						data={[data?.me?.posts.map((l) => l.likes.map((a) => a))]}
						renderItem={({ item }) =>
							item[0].map((i) =>
								data.me.id === i.user.id ? null : <Item key={i.user.id} user={i.user} />
							)
						}
					/>
				)
			)}
		</View>
	);
};
