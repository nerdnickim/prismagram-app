import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constans from "../constans";

const Container = styled.View`
	margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
	width: ${constans.width / 2};
	padding: 10px;
	background-color: ${(props) => props.theme.greyColor};
	border: 1px solid ${(props) => props.theme.darkGreyColor};
	border-radius: 4px;
`;

const AuthInput = ({
	placeholder,
	value,
	keyboardType = "default",
	autoCapitalize = "none",
	onChange,
	returnKeyType = "done",
	onEndEditing = () => null,
	autoCorrect = true,
}) => (
	<Container>
		<TextInput
			onChangeText={onChange}
			keyboardType={keyboardType}
			returnKeyType={returnKeyType}
			placeholder={placeholder}
			autoCapitalize={autoCapitalize}
			onEndEditing={onEndEditing}
			value={value}
			autoCorrect={autoCorrect}
		/>
	</Container>
);

AuthInput.propTypes = {
	placeHolder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	keyboardType: PropTypes.oneOf([
		"default",
		"number-pad",
		"decimal-pad",
		"numeric",
		"email-address",
		"phone-pad",
	]),
	autoCapitalize: PropTypes.oneOf(["characters", "words", "sentences", "none"]),
	onChange: PropTypes.func.isRequired,
	returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
	onEndEditing: PropTypes.func,
	autoCorrect: PropTypes.bool,
};

export default AuthInput;