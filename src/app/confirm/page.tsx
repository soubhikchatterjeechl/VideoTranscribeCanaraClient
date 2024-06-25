"use client";
import { useEffect, useContext, useState } from "react";
import VideoContext from "../store/video-context";
import styles from "./page.module.css";
import Button from "../components/ui/Button";

const Confirm = () => {
	const ctx = useContext(VideoContext);
	const [time, setTime] = useState<string>("0:0:0");

	useEffect(() => {
		if (!ctx.videoBlob) {
			ctx.resetRecording;
		}
	}, [ctx.videoBlob]);

	useEffect(() => {
		const totalSeconds: number = Math.floor(ctx.time / 1000);
		const totalMinutes: number = Math.floor(totalSeconds / 60);
		const totalHours: number = Math.floor(totalMinutes / 60);
		const minutes: number = Math.floor(totalMinutes - totalHours * 60);
		const seconds: number = Math.floor(totalSeconds - totalMinutes * 60);
		setTime(`${totalHours}:${minutes}:${seconds}`);
	}, [ctx.time]);

	return (
		<div className={styles.confirmVideo}>
			<div className={styles.videoPlayer}>
				<video
					ref={ctx.playbackRef}
					autoPlay
					className={styles.playVideo}
				></video>
				<div className={styles.timeElapsed}>{time}</div>
			</div>
			<div className={styles.controlButtons}>
				{!!ctx.videoBlob && (
					<Button
						onClick={ctx.playVideo}
						disabled={!ctx.videoBlob}
						className={styles.controlButton}
					>
						Play Video
					</Button>
				)}
				{!!ctx.videoBlob && (
					<Button
						onClick={ctx.resetRecording}
						disabled={!ctx.videoBlob}
						className={styles.controlButton}
					>
						Record Again
					</Button>
				)}
				{!(!ctx.videoBlob || ! ctx.isFullPlayed) && (
					<Button
						onClick={ctx.submitRecording}
						disabled={!ctx.videoBlob || !ctx.isFullPlayed}
						className={styles.controlButton}
					>
						Submit Video
					</Button>
				)}
			</div>
			<div className={styles.hr}></div>
			<div className={styles.script}>
				Play the entire video before submitting it.
			</div>
		</div>
	);
};

export default Confirm;
