"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const [loading, setLoading] = useState<boolean | null>(null);
	const [locationAccess, setLocationAccess] = useState<boolean | null>(null);
	const router = useRouter();

	const clickHandler = () => {
		router.replace("/4");
	}

	const requestVideoAndAudioPermissions = async (): Promise<void> => {
		try {
			setLoading(true);
			await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			setLoading(false);
		} catch (error) {
			console.error("Permissions denied", error);
		}
	};

	const requestLocationAccess = (): void => {
		setLocationAccess(false);
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocationAccess(true);
				},
				(error) => {
					console.error("Location access denied", error);
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser");
		}
	};

	return (
		<>
			<div className={`${styles.heading}`}>Hardware Permissions</div>
			<div className={`${styles.script}`}>
				We Request The Following Permissions Be Granted To Proceed With
				The Verification Process
			</div>
			<div className={styles.permissionCard}>
				<div>
					To Complete This Process, You Must Allow The App To Access
					The Microphone And Camera.
				</div>
				{loading == true && (
					<Image
						className={styles.image}
						src="/loading.svg"
						width={32}
						height={32}
						alt="Picture of the author"
					/>
				)}
				{loading == false && (
					<Image
						className={styles.image}
						src="/success.svg"
						width={32}
						height={32}
						alt="Picture of the author"
					/>
				)}
				<Button
					className={styles.controlButton}
					onClick={requestVideoAndAudioPermissions}
				>
					Allow Access
				</Button>
			</div>
			<div className={styles.permissionCard}>
				<div>
					To Complete This Process, You Must Allow The App To Access
					The Location.
				</div>
				{locationAccess == false && (
					<Image
						className={styles.image}
						src="/loading.svg"
						width={32}
						height={32}
						alt="Picture of the author"
					/>
				)}
				{locationAccess == true && (
					<Image
						className={styles.image}
						src="/success.svg"
						width={32}
						height={32}
						alt="Picture of the author"
					/>
				)}
				<Button
					className={styles.controlButton}
					onClick={requestLocationAccess}
				>
					Allow Access
				</Button>
			</div>
			{loading == false && locationAccess == true && (
				<Button
					className={styles.navigationButton}
					onClick={clickHandler}
				>
					Proceed
				</Button>
			)}
		</>
	);
};

export default Welcome;
