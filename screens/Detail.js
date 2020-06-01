import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POST_DETAIL } from "../sharedQueries";
import Loader from "../components/Loader";
import Post from "../components/Post";

const View = styled.View`
	flex: 1;
`;

const Text = styled.Text``;

export default ({ route }) => {
	const { loading, data } = useQuery(POST_DETAIL, {
		variables: {
			id: route.params.id,
		},
	});

	return (
		<View>
			{loading ? <Loader /> : data && data.seeFullPost && <Post {...data.seeFullPost} />}
		</View>
	);
};
