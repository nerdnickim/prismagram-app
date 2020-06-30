import React from "react";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import Constants from "expo-constants";
import { Text, View, Vibration } from "react-native";

export default () => {
	const askPermission = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(
				Permissions.NOTIFICATIONS
			);
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			let token = await Notifications.getExpoPushTokenAsync();
			console.log(token);

			const message = {
				to: token,
				sound: "default",
				title: "Original Title",
				body: "And here is the body!",
				data: { data: "goes here" },
				_displayInForeground: true,
			};
			const response = await fetch("https://exp.host/--/api/v2/push/send", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Accept-encoding": "gzip, deflate",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(message),
			});
			console.log(response);
		} else {
			alert("Must use physical device for Push Notifications");
		}
	};

	askPermission();
};
