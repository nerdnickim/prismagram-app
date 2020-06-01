import * as React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
	const valueInput = useInput("");
	const onSubmit = (term) => {
		console.log(`TERM : ${term}`);
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
		<View>
			<Text>Search</Text>
		</View>
	);
};
