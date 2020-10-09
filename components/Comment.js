import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import useInput from "../hooks/useInput";
import TextNavigation from "../navigation/TextNavigation";
import { useNavigation } from "@react-navigation/native";
import Loader from "./Loader";

const ADD_COMMENT = gql`
	mutation addComment($postId: String!, $text: String!) {
		addComment(postId: $postId, text: $text) {
			id
			text
			user {
				username
				avatar
			}
			createdAt
		}
	}
`;

const View = styled.View`
	display: flex;
	justify-content: space-between;
`;

const Contain = styled.View``;

const Header = styled.View`
	border: 1px solid ${styles.lightGreyColor};
	padding: 10px 0;
	display: flex;
	flex-direction: row;
`;

const Body = styled.View``;

const Meta = styled.View``;

const TouchAble = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
	margin: 0 8px;
`;

const CommentWrapper = styled.View`
	margin-top: 20px;
`;

const CommentContain = styled.View`
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
`;

const CmtUser = styled.View`
	margin: 0 5px;
`;

const Bold = styled.Text`
	font-weight: 500;
`;

const Text = styled.Text`
	font-weight: 300;
`;

const Location = styled.Text`
	font-size: 12px;
`;

const Caption = styled.Text``;

const Comment = ({ user, comments, location, caption, id }) => {
	const navigation = useNavigation();
	const commentInput = useInput("");
	const [addCommnetMutation, { loading }] = useMutation(ADD_COMMENT, {
		variables: {
			postId: id,
			text: commentInput.value,
		},
	});

	const [selfComments, setSelfComments] = useState([]);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const {
				data: { addComment },
			} = await addCommnetMutation();
			setSelfComments([...selfComments, addComment]);
			commentInput.setValue("");
		} catch (e) {
			console.log("Can't send Comment", e);
		}
	};

	return (
		<View>
			<Contain>
				<Header>
					<TouchAble>
						<Image
							size={{ width: 40, height: 40, borderRadius: 20 }}
							source={{ uri: user.avatar || avatar }}
						/>
					</TouchAble>
					<TouchAble>
						<HeaderUserContainer>
							<Bold>{user.username}</Bold>
							<Location>{location}</Location>
						</HeaderUserContainer>
					</TouchAble>
					<Caption>{caption}</Caption>
				</Header>
				<Body>
					<CommentWrapper>
						{comments?.map((c) => (
							<CommentContain key={c.id}>
								<CmtUser>
									<TouchAble>
										<Image
											size={{ width: 40, height: 40, borderRadius: 20 }}
											source={{ uri: c.user.avatar }}
										/>
									</TouchAble>
									<TouchAble>
										<Bold>{c.user.username}</Bold>
									</TouchAble>
								</CmtUser>

								<Text>{c.text}</Text>
							</CommentContain>
						))}
						{selfComments?.map((c) => (
							<CommentContain key={c.id}>
								<CmtUser>
									<TouchAble>
										<Image
											size={{ width: 40, height: 40, borderRadius: 20 }}
											source={{ uri: c.user.avatar }}
										/>
									</TouchAble>
									<TouchAble
										onPress={() =>
											navigation.navigate("UserDetail", { username: c.user.username })
										}
									>
										<Bold>{c.user.username}</Bold>
									</TouchAble>
								</CmtUser>

								<Text>{c.text}</Text>
							</CommentContain>
						))}
					</CommentWrapper>
				</Body>
			</Contain>
			<Meta>
				{loading ? (
					<Loader />
				) : (
					<TextNavigation
						value={commentInput.value}
						onChange={(text) => commentInput.onChange(text)}
						onSubmit={onSubmit}
					/>
				)}
			</Meta>
		</View>
	);
};

Comment.proptypes = {
	avatar: PropTypes.string,
};

export default Comment;
