import React from "react";
import { useQuery } from "react-apollo-hooks";
import { POST_DETAIL } from "../sharedQueries";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

export default ({ route }) => {
	const { loading, data } = useQuery(POST_DETAIL, {
		variables: {
			id: route.params.id,
		},
	});

	return (
		<ScrollView>
			{loading ? (
				<Loader />
			) : (
				data &&
				data.seeFullPost && <Post {...data.seeFullPost} userId={route.params.id} />
			)}
		</ScrollView>
	);
};
