import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import constans from "../constans";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
	<TextInput
		style={{
			width: constans.width - 30,
			height: 30,
			backgroundColor: styles.lightGreyColor,
			borderRadius: 6,
			padding: 8,
			textAlign: "center",
		}}
		returnKeyType="search"
		onChangeText={onChange}
		onEndEditing={onSubmit}
		value={value}
		placeholder={"Search"}
		placeholderTextColor={styles.darkGreyColor}
		autoCorrect={false}
	/>
);

SearchBar.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
