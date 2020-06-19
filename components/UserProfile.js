import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constans from "../constans";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

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
	border: 1px solid ${styles.lightGreyColor};
	padding: 5px 0;
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
	posts,
	user,
}) => {
	const [isGrid, setIsGrid] = useState(true);
	const toggleGrid = () => setIsGrid((i) => !i);
	return (
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
				<TouchableOpacity onPress={toggleGrid}>
					<Button>
						<Ionicons
							color={isGrid ? styles.blackColor : styles.darkGreyColor}
							size={32}
							name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
						/>
					</Button>
				</TouchableOpacity>
				<TouchableOpacity onPress={toggleGrid}>
					<Button>
						<Ionicons
							color={!isGrid ? styles.blackColor : styles.darkGreyColor}
							size={32}
							name={Platform.OS === "ios" ? "ios-list" : "md-list"}
						/>
					</Button>
				</TouchableOpacity>
			</ButtonContainer>
			{posts?.map((p) =>
				isGrid ? <SquarePhoto key={p.id} {...p} /> : <Post key={p.id} {...p} />
			)}
		</View>
	);
};

UserProfile.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired,
	}).isRequired,
};

export default UserProfile;
