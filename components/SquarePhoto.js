import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import constans from "../constans";
import { withNavigation } from "@react-navigation/compat";

const SquearePhoto = ({ navigation, files = [], id }) => (
	<TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
		<Image
			resizeMode="stretch"
			source={{ uri: files[0].url }}
			style={{
				width: constans.width / 3,
				height: constans.height / 6,
			}}
		/>
	</TouchableOpacity>
);

SquearePhoto.propTypes = {
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	id: PropTypes.string.isRequired,
};

export default withNavigation(SquearePhoto);
