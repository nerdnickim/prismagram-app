import React from "react";
import styled from "styled-components";
import { View } from "react-native";

export default () => {
	return (
		<View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
			<View
				style={{
					height: "50%",
					width: "100%",
					backgroundColor: "#fff",
					justifyContent: "center",
				}}
			></View>
		</View>
	);
};
