<script>
	// @ts-nocheck

	import { initializeApp } from "firebase/app";
	import { getMessaging, getToken, onMessage } from "firebase/messaging";
	import { v4 as uuid } from "uuid";

	import { onMount } from "svelte";
	import {
		deviceInfo,
		subscribeToTopic,
	} from "../../../routes/api/fetchData";
	import NotificationMessage from "./NotificationMessage.svelte";
	import NotificationPermission from "./NotificationPermission.svelte";
	import { getCookie, setCookie } from "../utils/utils";

	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	export let language = "E";
	export let envDetails = {};


	const blockPopForWhile = () => {
        const date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        setCookie("tempBlockNotification", true, date);
    };

	let showModal = false;
	let notificationPermisionModal = false;

	let notificationMessage = null;

	const firebaseConfig = {
		apiKey: "AIzaSyCJCqzD4MhNFMcF8Ic52oECAivvZyw2qVw",
		authDomain: "republic-prod.firebaseapp.com",
		databaseURL: "https://republic-prod.firebaseio.com",
		projectId: "republic-prod",
		storageBucket: "republic-prod.appspot.com",
		messagingSenderId: "1098766585632",
		appId: "1:1098766585632:web:00385239bc210a1cfd5145",
		measurementId: "G-XZ0F34Q4WG",
	};

	const publicKey =
		"BINHJvwnwoN8c5vX4q887SHe9Plo7MxZw2ul4idG6QchGvsMnMKD3PwUO0FweVF2f2Io9-5c0fSVn6R0GJNGXJg";

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const getTokens = async () => {
		const isPermissionAllow = await requestPermission();
		let currentToken = "";

		let deviceNotificationId = localStorage.getItem("deviceNotificationId");
		if (isPermissionAllow && deviceNotificationId == null) {
			try {
				const messaging = getMessaging(app);
				currentToken = await getToken(messaging, {
					vapidKey: publicKey,
				}); //"english, location"

				if (currentToken) {
					const location = await getLocation();
					let deviceNotificationId = uuid();
					let data = {
						deviceNotificationId: deviceNotificationId,
						token: currentToken,
					};
					if (location?.latitude) {
						data = {
							...data,
							latitude: location?.latitude,
							longitude: location?.longitude,
						};
					}

					subscribeToTopic(language, data).then((res) => {
						localStorage.setItem(
							"deviceNotificationId",
							deviceNotificationId,
						);
					});

					deviceInfo(language, data).then((res) => {});
				}
			} catch (error) {
				console.log(
					"An error occurred while retrieving token. ",
					error,
				);
			}
			return currentToken;
		} else {
			blockPopForWhile();
		}
		return false;
	};

	export const handleForegroundMessage = () => {
		try {
			if ("serviceWorker" in navigator) {
				const messaging = getMessaging(app);
				return new Promise((resolve, reject) => {
					onMessage(messaging, (payload) => {
						showModal = true;
						notificationMessage = {
							title: payload.notification.title,
							body: payload.notification.body,
							image:
								payload?.notification?.image ||
								payload?.notification?.icon,
							url: payload.data?.redirectUrl,
						};
						console.log("Notification Fire", payload);
						resolve(payload);
					});
				});
			} else {
				return Promise.reject(
					new Error("Service Worker is not supported"),
				);
			}
		} catch (error) {
			throw error;
		}
	};

	function checkNotificationSupport() {
		if (!("Notification" in window)) {
			return false;
		} else {
			return true;
		}
	}

	async function getLocation() {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(pos) => {
						resolve({
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude,
						});
					},
					(error) => {
						resolve(null);
					},
				);
			} else {
				reject("Geolocation is not supported by this browser.");
			}
		});
	}

	onMount(() => {
		handleForegroundMessage();
		//--- triger notification.
		setTimeout(() => {
			let tempBlockNotification = getCookie("tempBlockNotification");

			let deviceNotificationId = localStorage.getItem(
				"deviceNotificationId",
			);

			if (!tempBlockNotification && !deviceNotificationId) {
				notificationPermisionModal = true;
			}
		}, 20000);
	});

	async function requestPermission() {
		return new Promise((resolve) => {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	function allowNotification() {
		if (checkNotificationSupport) {
			getTokens();
			notificationPermisionModal = false;
		}
	}
</script>

<NotificationMessage
	{showModal}
	{envDetails}
	title={notificationMessage?.title}
	body={notificationMessage?.body}
	url={notificationMessage?.url}
	image={notificationMessage?.image}
/>

<NotificationPermission
	{envDetails}
	showModal={notificationPermisionModal}
	{allowNotification}
/>
