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

	useEffect(() => {
		console.log(ctx.user);
	});

	const clickHandler = () => {
		router.replace("/13");
	};

	return (
		<>
			<div className={`${styles.heading}`}>Disclaimer</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>
					Proposal Number: 1234567890
				</div>
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>Tax Disclaimer</div>
					<div className={styles.field}>
						You Can Reach Out To Your Tax Advisor For Any Tax
						Related Queries Regarding Your Proposal.
					</div>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>IRDAI Disclaimer</div>
					<div className={styles.field}>
						I Would Like To Inform You That Neither IRDAI Nor Any
						Insurance Company Including Canara HSBC Life Insurance
						Offers Any Additional Gifts Or Schemes Or Offers On Any
						Existing Or New Policy.
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<Button
					className={styles.controlButton}
					onClick={clickHandler}
				>
					Proceed
				</Button>
			</div>
		</>
	);
};

export default Welcome;
