"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import VideoContext from "@/app/store/video-context";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const ctx = useContext(VideoContext);
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		console.log(ctx.user);
	});

	const clickHandler = () => {
		setError(true);
		ctx.user.additionalComments = inputRef.current?.value || "";
	};

	const errorHandler = () => {
		setError(false);
	}

	return (
		<>
			{error && (
				<ErrorModal
					error={[
						"Your Application Has Been Successfully Submitted!",
					]}
					buttonString="Close"
					errorHander={errorHandler}
				/>
			)}
			<div className={`${styles.heading}`}>ThankYou</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>
					Proposal Number: 1234567890
				</div>
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>Customer Care</div>
					<input
						type="text"
						className={styles.field}
						required
						readOnly
						value="9876543210"
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Email Us</div>
					<input
						type="text"
						className={styles.field}
						required
						readOnly
						value="asdfg@qwert.zxcv"
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>More Information</div>
					<input
						type="text"
						className={styles.field}
						required
						readOnly
						value="www.asdfg.zxcvbn"
					></input>
				</div>
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>
						Additional Comments If You Wish To Add!
					</div>
					<input
						type="text"
						className={styles.field}
						ref={inputRef}
					/>
				</div>
			</div>
			<div className={styles.flex}>
				<Button className={styles.controlButton}>Download PDF</Button>
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
