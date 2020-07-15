import React, { useState } from "react";
import styled from "styled-components";
import { View, Text, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import constans from "../../constans";
import FollowBtn from "../../components/FollowBtn";

export default ({ route }) => {
	const navigation = useNavigation();
	const { id } = route.params;

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = () => {
		try {
			setRefreshing(true);
			refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};

	const ItemView = styled.View`
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20px;
		margin: 10px 0;
	`;

	return (
		<View>
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				data={[route.params]}
				renderItem={({ item }) =>
					item.following.map((u) => (
						<ItemView key={u.id}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("UserDetail", { username: u.username })
								}
								style={{ flexDirection: "row" }}
							>
								<Image
									style={{
										width: constans.width / 20,
										height: constans.height / 20,
										borderRadius: 20,
									}}
									source={{
										uri: item.avatar,
									}}
								/>
								<Text>{u.username}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									paddingRight: 20,
								}}
							>
								<FollowBtn id={id} isFollowing={u.isFollowing} />
							</TouchableOpacity>
						</ItemView>
					))
				}
				keyExtractor={(item) => null}
			/>
		</View>
	);
};
