import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constans from "../constans";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import FollowBtn from "./FollowBtn";
import { useNavigation } from "@react-navigation/native";
import UserCustom from "./UserCustom";
import { useLogOut } from "../AuthContext";

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

const LogContain = styled.View`
	margin-top: 14px;
	left: 20px;
`;

const BtnPress = styled.TouchableOpacity``;

const FollowPress = styled.TouchableOpacity`
	align-items: center;
`;

const BtnName = styled.Text``;

const UserProfile = ({
	id,
	avatar,
	postsCount,
	followers,
	following,
	fullName,
	firstName,
	lastName,
	username,
	posts,
	isMe,
	isFollowing,
}) => {
	const [isGrid, setIsGrid] = useState(true);
	const toggleGrid = () => setIsGrid((i) => !i);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () =>
				isMe ? (
					<UserCustom username={username} firstName={firstName} lastName={lastName} />
				) : null,
		});
	}, []);

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
							<FollowPress
								onPress={() =>
									navigation.navigate("FollowingShow", { following, username, id })
								}
							>
								<Bold>{following.length}</Bold>
								<StatName>following</StatName>
							</FollowPress>
						</Stat>
						<Stat>
							<FollowPress
								onPress={() =>
									navigation.navigate("FollowerShow", { followers, username, id })
								}
							>
								<Bold>{followers.length}</Bold>
								<StatName>followers</StatName>
							</FollowPress>
						</Stat>
					</ProfileStats>
					<LogContain>
						{isMe ? null : <FollowBtn id={id} isFollowing={isFollowing} />}
					</LogContain>
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
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{posts?.map((p) =>
					isGrid ? <SquarePhoto key={p.id} {...p} /> : <Post key={p.id} {...p} />
				)}
			</View>
		</View>
	);
};

UserProfile.propTypes = {
	id: PropTypes.string.isRequired,
};

export default UserProfile;
