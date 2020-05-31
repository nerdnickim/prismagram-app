import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image } from "react-native";

const Container = styled.View``;
const Header = styled.View`
	padding: 10px;
	flex-direction: row;
	align-items: center;
`;
const HeaderUserContainer = styled.View`
	margin-left: 8px;
`;
const Touchable = styled.TouchableOpacity``;

const Bold = styled.Text`
	font-weight: 500;
`;

const Location = styled.Text`
	font-size: 12px;
`;

const Post = ({ user, location, files }) => {
	return (
		<Container>
			<Header>
				<Touchable>
					<Image style={{ width: 40, height: 40 }} source={{ uri: user.avatar }} />
				</Touchable>
				<Touchable>
					<HeaderUserContainer>
						<Bold>{user.username}</Bold>
						<Location>{location}</Location>
					</HeaderUserContainer>
				</Touchable>
			</Header>
		</Container>
	);
};

Post.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired,
	}).isRequired,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	likeCount: PropTypes.number,
	isLiked: PropTypes.bool.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired,
			}).isRequired,
		})
	).isRequired,
	createdAt: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	location: PropTypes.string,
};

export default Post;
