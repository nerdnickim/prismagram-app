import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
	fragment PostParts on Post {
		id
		location
		caption
		user {
			id
			avatar
			username
			isMe
		}
		files {
			id
			url
		}
		likeCount
		isLiked
		comments {
			id
			text
			user {
				id
				avatar
				username
			}
		}
		likes {
			id
			user {
				id
				avatar
				username
			}
		}
		createdAt
	}
`;

export const USER_FRAGMENT = gql`
	fragment UserParts on User {
		id
		avatar
		username
		firstName
		lastName
		fullName
		isFollowing
		bio
		isMe
		following {
			id
			username
			avatar
			isFollowing
		}
		followers {
			id
			username
			avatar
			isFollowing
		}
		followingCount
		followersCount
		postsCount
		posts {
			...PostParts
		}
	}
	${POST_FRAGMENT}
`;
