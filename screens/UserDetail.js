import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "../sharedQueries";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

export default ({ route }) => {
	const { loading, data } = useQuery(GET_USER, {
		variables: {
			username: route.params.username,
		},
	});

	return (
		<ScrollView>
			{loading ? <Loader /> : data && data.seeUser && <UserProfile {...data.seeUser} />}
		</ScrollView>
	);
};
