import * as React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";

export const SEARCH = gql`
	query search($term: String!) {
		searchPost(term: $term) {
			id
			files {
				id
				url
			}
			likeCount
			commentCount
		}
		searchUser(term: $term) {
			id
			avatar
			username
			isFollowing
			isMe
		}
	}
`;

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
	const valueInput = useInput("");
	const [refreshing, setRefreshing] = React.useState(false);
	const { data, loading, refetch } = useQuery(SEARCH, {
		skip: valueInput.value === undefined,
		variables: { term: valueInput.value },
	});

	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch({ variables: { term: valueInput.value } });
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
			console.log(data, loading);
		}
	};

	const onSubmit = async (term) => {
		await refetch({ variables: { term } });
		console.log(term);
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => {
				return (
					<SearchBar
						value={valueInput.value}
						onChange={(text) => valueInput.onChange(text)}
						onSubmit={() => {
							onSubmit(valueInput.value);
						}}
					/>
				);
			},
		});
	}, [navigation, valueInput.onChange]);
	return (
		<ScrollView
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
		></ScrollView>
	);
};
