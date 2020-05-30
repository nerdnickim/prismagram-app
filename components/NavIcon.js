import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import PropTypes from "prop-types";

const NavIcon = ({ focused = true, name, color = styles.blackColor, size = 26 }) => (
	<Ionicons name={name} color={focused ? color : styles.darkGreyColor} size={size} />
);

NavIcon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.number,
	focused: PropTypes.bool,
};

export default NavIcon;
