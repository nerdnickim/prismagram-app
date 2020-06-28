import { proc } from "react-native-reanimated";

const options = {
	uri:
		process.env.NODE_ENV === "development"
			? "http://localhost:4000"
			: "https://cloneinggram-backend.herokuapp.com",
};

export default options;
