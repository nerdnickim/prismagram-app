import * as React from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "../../sharedQueries";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default () => {
	const { data, loading } = useQuery(FEED_QUERY);
	return <View>{loading ? <Loader /> : null}</View>;
};
