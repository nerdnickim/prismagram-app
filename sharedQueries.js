import { gql } from "apollo-boost";
import { POST_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const FEED_QUERY = gql`
	{
		seeFeed {
			...PostParts
		}
	}
	${POST_FRAGMENT}
`;

export const POST_DETAIL = gql`
	query seeFullPost($id: String!) {
		seeFullPost(id: $id) {
			...PostParts
		}
	}
	${POST_FRAGMENT}
`;

export const ME = gql`
	{
		me {
			...UserParts
		}
	}
	${USER_FRAGMENT}
`;

export const GET_USER = gql`
	query seeUser($username: String!) {
		seeUser(username: $username) {
			...UserParts
		}
	}
	${USER_FRAGMENT}
`;
