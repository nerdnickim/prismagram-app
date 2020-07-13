import React, { useState, useEffect } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import constans from "../constans";
import styles from "../styles";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "@react-navigation/compat";
import PostOptions from "./PostOptions";

export const TOGGLE_LIKE = gql`
	mutation toggleLike($postId: String!) {
		toggleLike(postId: $postId)
	}
`;

const Container = styled.View`
	margin-bottom: 16px;
`;
const Header = styled.View`
	padding: 10px;
	flex-direction: row;
	justify-content: space-between;
`;
const HeaderUserContainer = styled.View`
	margin-left: 8px;
`;

const UserWrapper = styled.View`
	flex-direction: row;
`;

const Options = styled.View``;

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

const CreatedAt = styled.Text``;

const Post = ({
	userId,
	id,
	user,
	location,
	files = [],
	likeCount,
	caption,
	comments = [],
	isLiked,
	navigation,
	createdAt,
}) => {
	const [isLikedS, setIsLiked] = useState(isLiked);
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
		variables: {
			postId: id,
		},
	});
	const [likeCountS, setLikeCountS] = useState(likeCount);

	const toggleLike = async () => {
		if (isLikedS === true) {
			setLikeCountS(likeCountS - 1);
		} else {
			setLikeCountS(likeCountS + 1);
		}
		setIsLiked((p) => !p);
		try {
			await toggleLikeMutation();
		} catch (e) {
			console.log(e);
		}
	};

	const gapCreatedAt = (value) => {
		const today = new Date();
		const timeValue = new Date(value);

		const betweenTime = Math.floor(
			Math.floor(today.getTime() - timeValue.getTime()) / 1000 / 60
		);
		if (betweenTime < 1) {
			return "방금 전";
		} else if (betweenTime < 60) {
			return `${betweenTime}분 전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간 전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일 전`;
		}

		return `${Math.floor(betweenTimeDay / 365)}년 전`;
	};

	return (
		<Container>
			<Header>
				<UserWrapper>
					<Touchable
						onPress={() => navigation.navigate("UserDetail", { username: user.username })}
					>
						<Image
							style={{ width: 40, height: 40, borderRadius: 20 }}
							source={{ uri: user.avatar || avatar }}
						/>
					</Touchable>
					<Touchable
						onPress={() => navigation.navigate("UserDetail", { username: user.username })}
					>
						<HeaderUserContainer>
							<Bold>{user.username}</Bold>
							<Location>{location}</Location>
						</HeaderUserContainer>
					</Touchable>
				</UserWrapper>
				<Options>
					<TouchableOpacity>
						{user.isMe ? (
							<PostOptions
								id={id}
								location={location}
								caption={caption}
								userId={userId}
							/>
						) : null}
					</TouchableOpacity>
				</Options>
			</Header>
			<Swiper style={{ height: constans.height / 2.5 }}>
				{files.map((file) => (
					<Image
						resizeMode="stretch"
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
								onPress={toggleLike}
								size={24}
								color={isLikedS ? styles.redColor : styles.blackColor}
								name={
									Platform.OS === "ios"
										? isLikedS
											? "ios-heart"
											: "ios-heart-empty"
										: isLikedS
										? "md-heart"
										: "md-heart-empty"
								}
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
					<Bold>{likeCountS === 1 ? "1 likes" : `${likeCountS} likes`}</Bold>
				</Touchable>
				<Caption>
					<Bold>{user.username}</Bold> {caption}
				</Caption>
				<CreatedAt>
					<Bold>{gapCreatedAt(createdAt)}</Bold>
				</CreatedAt>
				<Touchable
					onPress={() =>
						navigation.navigate("CommentDetail", {
							username: user.username,
							id,
						})
					}
				>
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

export default withNavigation(Post);
