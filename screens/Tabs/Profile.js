import * as React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../sharedQueries";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
	const { data, loading } = useQuery(ME);
	React.useEffect(() => {
		if (data.me) {
			navigation.setParams("title", data.me.username);
		}
	}, [data]);
	return (
		<ScrollView>
			{loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
			{console.log(data.me)}
		</ScrollView>
	);
};
