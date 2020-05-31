import * as React from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "../../sharedQueries";
import Post from "../../components/Post";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default () => {
	const [refreshing, setRefreshing] = React.useState(false);
	const { data, loading, refetch } = useQuery(FEED_QUERY);

	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};
	return (
		<ScrollView
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
		>
			{loading ? (
				<Loader />
			) : (
				data &&
				data.seeFeed &&
				data.seeFeed.map((post) => <Post key={post.id} {...post} />)
			)}
		</ScrollView>
	);
};
