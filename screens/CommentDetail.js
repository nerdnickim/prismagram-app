import React from "react";
import { ScrollView } from "react-native";
import { POST_DETAIL } from "../sharedQueries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import Comment from "../components/Comment";

export default ({ route }) => {
	const { loading, data } = useQuery(POST_DETAIL, {
		variables: {
			id: route.params.id || id,
		},
	});

	return (
		<ScrollView>
			{loading ? <Loader /> : data?.seeFullPost && <Comment {...data.seeFullPost} />}
			{console.log(data)}
		</ScrollView>
	);
};
