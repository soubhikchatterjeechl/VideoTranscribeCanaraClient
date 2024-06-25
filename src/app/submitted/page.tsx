"use client";
import { useContext } from "react";
import VideoContext from "../store/video-context";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import styles from "./page.module.css";

const SubmittedSuccessfully = () => {
	const ctx = useContext(VideoContext);

	return (
		<div className={styles.submitted}>
			{!ctx.videoBlob && (
				<div className={styles.script}>No Video Available!</div>
			)}
			{!ctx.submitting && <LoadingSpinner />}
			{ctx.submitting && (
				<div className={styles.script}>{ctx.submitting}</div>
			)}
		</div>
	);
};

export default SubmittedSuccessfully;
