"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
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
		router.replace("/12");
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
			<div className={`${styles.heading}`}>Rider Details</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>
					Proposal Number: 1234567890
				</div>
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>Rider 1</div>
					<div className={styles.field}>Kotak Term Benifit</div>
					<div className={styles.field}>Sum Assured: 200000</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Rider 2</div>
					<div className={styles.field}>Accidental Death Benifit</div>
					<div className={styles.field}>Sum Assured: 200000</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Rider 3</div>
					<div className={styles.field}>Critical Illness Benifit</div>
					<div className={styles.field}>Sum Assured: 200000</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>Rider 4</div>
					<div className={styles.field}>
						Accidental Disability Guardian Benifit
					</div>
					<div className={styles.field}>Sum Assured: 200000</div>
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
