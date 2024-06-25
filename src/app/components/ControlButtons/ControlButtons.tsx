import { useContext, useEffect, useState } from "react";
import styles from "./ControlButtons.module.css";
import VideoContext from "../../store/video-context";
import Button from "../ui/Button";

const ControlButtons = () => {
	const ctx = useContext(VideoContext);
	const [minTimeMet, setMinTimeMet] = useState<boolean>(false);

	useEffect(() => {
		const minDuration = 30;
		const maxDuration = 120;
		if (ctx.time < 1000 * minDuration) {
			setMinTimeMet(false);
		} else {
			setMinTimeMet(true);
		}
		if (ctx.time > 1000 * maxDuration) {
			ctx.stopRecording();
		}
	}, [ctx.time]);

	return (
		<>
			<div className={styles.controlButtons}>
				{!(
					ctx.recording ||
					ctx.paused ||
					ctx.playing ||
					!!ctx.videoBlob
				) && (
					<Button
						onClick={ctx.startRecording}
						disabled={
							ctx.recording ||
							ctx.paused ||
							ctx.playing ||
							!!ctx.videoBlob
						}
						className={styles.controlButton}
					>
						Start Recording
					</Button>
				)}
				{!(!ctx.recording || ctx.paused) && (
					<Button
						onClick={ctx.pauseRecording}
						disabled={!ctx.recording || ctx.paused}
						className={styles.controlButton}
					>
						Pause Recording
					</Button>
				)}
				{!(!ctx.recording || !ctx.paused) && (
					<Button
						onClick={ctx.resumeRecording}
						disabled={!ctx.recording || !ctx.paused}
						className={styles.controlButton}
					>
						Resume Recording
					</Button>
				)}
				{!(!ctx.recording || !minTimeMet) && (
					<Button
						onClick={ctx.stopRecording}
						disabled={!ctx.recording || !minTimeMet}
						className={styles.controlButton}
					>
						Stop Recording
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
				{!!ctx.videoBlob && (
					<Button
						onClick={ctx.confirmRecording}
						disabled={!ctx.videoBlob}
						className={styles.controlButton}
					>
						Confirm
					</Button>
				)}
			</div>
		</>
	);
};

export default ControlButtons;
