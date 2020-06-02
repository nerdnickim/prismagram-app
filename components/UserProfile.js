import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constans from "../constans";

const ProfileHeader = styled.View`
	padding: 20px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
	flex-direction: row;
`;

const Stat = styled.View`
	margin-left: 25px;
	align-items: center;
`;
const Bold = styled.Text`
	font-weight: 600;
`;
const StatName = styled.Text`
	font-size: 13px;
	color: ${styles.darkGreyColor};
`;
const ProfileMeta = styled.View`
	margin-top: 10px;
	padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const Username = styled.Text``;

const ButtonContainer = styled.View`
	flex-direction: row;
	margin-top: 30px;
`;

const Button = styled.View`
	width: ${constans.width / 2};
	align-items: center;
`;

const UserProfile = ({
	avatar,
	postsCount,
	followers,
	following,
	fullName,
	username,
}) => (
	<View>
		<ProfileHeader>
			<Image
				style={{ height: 70, width: 70, borderRadius: 40 }}
				source={{ uri: avatar }}
			/>
			<HeaderColumn>
				<ProfileStats>
					<Stat>
						<Bold>{postsCount}</Bold>
						<StatName>Posts</StatName>
					</Stat>
					<Stat>
						<Bold>{following.length}</Bold>
						<StatName>following</StatName>
					</Stat>
					<Stat>
						<Bold>{followers.length}</Bold>
						<StatName>followers</StatName>
					</Stat>
				</ProfileStats>
			</HeaderColumn>
		</ProfileHeader>
		<ProfileMeta>
			<Bold>{fullName}</Bold>
			<Username>{username}</Username>
		</ProfileMeta>
		<ButtonContainer>
			<TouchableOpacity>
				<Button>
					<Ionicons size={32} name={Platform.OS === "ios" ? "ios-grid" : "md-grid"} />
				</Button>
			</TouchableOpacity>
			<TouchableOpacity>
				<Button>
					<Ionicons size={32} name={Platform.OS === "ios" ? "ios-list" : "md-list"} />
				</Button>
			</TouchableOpacity>
		</ButtonContainer>
	</View>
);

UserProfile.propTypes = {
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

export default UserProfile;
