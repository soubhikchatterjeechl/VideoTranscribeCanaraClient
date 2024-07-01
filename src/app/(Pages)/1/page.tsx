"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.replace("/2and3");
	};

	return (
		<>
			<div className={`${styles.heading}`}>Start Your Journey</div>
			<div className={`${styles.referenceNumber}`}>
				Reference Number: 1234567890
			</div>
			<Button
				className={`${styles.controlButton}`}
				onClick={clickHandler}
			>
				English
			</Button>
		</>
	);
};

export default Welcome;
