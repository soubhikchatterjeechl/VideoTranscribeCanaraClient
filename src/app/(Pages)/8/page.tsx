"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ErrorModal from "./../../components/ErrorModal/ErrorModal";
import VideoContext from "@/app/store/video-context";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const ctx = useContext(VideoContext);
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		console.log(ctx.user);
	});

	const clickHandler = () => {
		router.replace("/9");
	};

	const disagreement = () => {
		setError(true);
	};

	const errorHandler = (err?: string) => {
		if (err) {
			ctx.user.disagreement.push(err);
		}
		setError(false);
	};

	return (
		<>
			{error && (
				<ErrorModal
					error={[
						"Enter Your Disagreement In The Box Provided Below And Click Proceed.",
					]}
					buttonString="Proceed"
					isInputAvailable={true}
					errorHander={errorHandler}
				/>
			)}
			<div className={`${styles.heading}`}>Personal Details</div>
			<div className={styles.card}>
				<div className={styles.info}>
					<div className={styles.infoItem}>
						Face Detected
						<Image
							src="/success.svg"
							width={32}
							height={32}
							alt="Picture of the author"
						/>
					</div>
					<div className={styles.infoItem}>
						Proposal Number: 1234567890
					</div>
				</div>
				{ctx.photoBlob && (
					<Image
						className={styles.image}
						src={URL.createObjectURL(ctx.photoBlob)}
						alt="Captured"
						width={280}
						height={210}
					/>
				)}
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>Customer Complete Name</div>
					<div className={styles.field}>Mr. Harsh</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Date Of Birth</div>
					<div className={styles.field}>20-07-2004</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Registered Mobile Number</div>
					<div className={styles.field}>9658612596</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Registered Email Address</div>
					<div className={styles.field}>aerichk@asd.com</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Complete Address</div>
					<div className={styles.field}>20-07-2004</div>
				</div>
			</div>
			<div className={styles.flex}>
				<Button
					className={styles.controlButton}
					onClick={disagreement}
				>
					Disagree
				</Button>
				<Button
					className={styles.controlButton}
					onClick={clickHandler}
				>
					Agree
				</Button>
			</div>
		</>
	);
};

export default Welcome;
