import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "./fragments";

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
			id
			username
			updatedAt
			isMe
			posts {
				id
				isLiked
				files {
					id
					url
				}
				likes {
					id
					user {
						id
						avatar
						username
					}
				}
			}
		}
	}
`;
