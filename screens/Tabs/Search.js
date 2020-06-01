import * as React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import SquearePhoto from "../../components/SquarePhoto";

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

const View = styled.View``;

const Text = styled.Text``;

export default ({ navigation }) => {
	const valueInput = useInput("");
	const [refreshing, setRefreshing] = React.useState(false);
	const { data, loading, refetch } = useQuery(SEARCH, {
		variables: { term: valueInput.value },
		skip: valueInput.value === undefined || valueInput.value === "",
		fetchPolicy: "network-only",
	});

	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch({
				variables: {
					term: valueInput.value,
				},
			});
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};

	const onSubmit = async (term) => {
		await refetch({ variables: { term } });
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => {
				return (
					<SearchBar
						value={valueInput.value}
						onChange={(text) => valueInput.onChange(text)}
						onSubmit={() => onSubmit(valueInput.value)}
					/>
				);
			},
		});
	}, [navigation, valueInput.onChange]);
	return (
		<ScrollView
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
		>
			{loading ? (
				<Loader />
			) : (
				data &&
				data.searchPost &&
				data.searchPost.map((post) => <SquearePhoto key={post.id} {...post} />)
			)}
		</ScrollView>
	);
};
