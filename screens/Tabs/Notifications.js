import * as React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../sharedQueries";
import { FlatList, TouchableOpacity } from "react-native";
import Loader from "../../components/Loader";

const View = styled.View``;

const ItemView = styled.View`
	flex-direction: row;
`;

const Text = styled.Text`
	align-items: center;
	margin: 0 10px;
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

	const Item = ({ username }) => {
		return (
			<ItemView>
				<TouchableOpacity onPress={() => navigation.navigate("UserDetail", { username })}>
					<Text>{username}</Text>
				</TouchableOpacity>
				<Text>님이 회원님의 게시물을 좋아합니다</Text>
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
						data={[
							{
								username: data?.me?.posts.map((p) => p.likes.map((l) => l.user.username)),
								id: data?.me?.posts?.map((p) => p.likes.map((l) => l.user.id)),
							},
						]}
						renderItem={({ item }) => item.username[0].map((i) => <Item username={i} />)}
						keyExtractor={(item) => item.id}
					/>
				)
			)}
		</View>
	);
};
