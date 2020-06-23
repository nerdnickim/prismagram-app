import React, { useState } from "react";
import Button from "./Button";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const FollowBtn = ({ id, isFollowing }) => {
	const FOLLOW = gql`
		mutation follow($id: String!) {
			follow(id: $id)
		}
	`;

	const UNFOLLOW = gql`
		mutation unfollow($id: String!) {
			unfollow(id: $id)
		}
	`;

	let [isFollowS, setIsFollowS] = useState(isFollowing);
	const [followMutation] = useMutation(FOLLOW, { variables: { id } });
	const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

	const onPressHandle = () => {
		if (isFollowS === true) {
			setIsFollowS(false);
			followMutation();
		} else {
			setIsFollowS(true);
			unfollowMutation();
		}
	};

	return <Button onPress={onPressHandle} text={isFollowS ? "UnFollow" : "Follow"} />;
};

export default FollowBtn;
