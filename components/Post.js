import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, Platform } from "react-native";
import Swiper from "react-native-swiper";
import constans from "../constans";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const Container = styled.View`
	margin-bottom: 16px;
`;
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

const InfoContainer = styled.View`
	margin: 10px 0 0 10px;
`;

const IconsContainer = styled.View`
	flex-direction: row;
	margin-bottom: 8px;
`;

const IconContainer = styled.View`
	margin-right: 12px;
`;

const Caption = styled.Text`
	margin-top: 3px;
`;

const CommentsCount = styled.Text`
	margin-top: 3px;
	opacity: 0.5;
	font-size: 12px;
`;

const Post = ({
	user,
	location,
	files = [],
	likeCount,
	caption,
	comments = [],
	isLiked,
}) => {
	return (
		<Container>
			<Header>
				<Touchable>
					<Image
						style={{ width: 40, height: 40, borderRadius: 20 }}
						source={{ uri: user.avatar }}
					/>
				</Touchable>
				<Touchable>
					<HeaderUserContainer>
						<Bold>{user.username}</Bold>
						<Location>{location}</Location>
					</HeaderUserContainer>
				</Touchable>
			</Header>
			<Swiper style={{ height: constans.height / 2.5 }}>
				{files.map((file) => (
					<Image
						key={file.id}
						style={{ width: constans.width, height: constans.height / 2.5 }}
						source={{ uri: file.url }}
					/>
				))}
			</Swiper>
			<InfoContainer>
				<IconsContainer>
					<Touchable>
						<IconContainer>
							<Ionicons
								size={24}
								name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
							/>
						</IconContainer>
					</Touchable>
					<Touchable>
						<IconContainer>
							<SimpleLineIcons size={24} name="bubble" color="black" />
						</IconContainer>
					</Touchable>
				</IconsContainer>
				<Touchable>
					<Bold>{likeCount === 1 ? "1 likes" : `${likeCount} likes`}</Bold>
				</Touchable>
				<Caption>
					<Bold>{user.username}</Bold> {caption}
				</Caption>
				<Touchable>
					<CommentsCount>
						See all {comments.length === 0 ? null : comments.length} comments
					</CommentsCount>
				</Touchable>
			</InfoContainer>
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
