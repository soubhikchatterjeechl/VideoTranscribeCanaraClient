import styles from "./VideoPlayer.module.css";
import VideoContext from "../../store/video-context";
import { useContext, useEffect, useState } from "react";

const VideoPlayer = () => {
	const ctx = useContext(VideoContext);
	const [time, setTime] = useState<string>("0:0:0");

	useEffect(() => {
		const totalSeconds: number = Math.floor(ctx.time / 1000);
		const totalMinutes: number = Math.floor(totalSeconds / 60);
		const totalHours: number = Math.floor(totalMinutes / 60);
		const minutes: number = Math.floor(totalMinutes - totalHours * 60);
		const seconds: number = Math.floor(totalSeconds - totalMinutes * 60);
		setTime(`${totalHours}:${minutes}:${seconds}`);
	}, [ctx.time]);

	useEffect(() => {
		const setupCamera = async () => {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			if (ctx.videoRef.current) {
				ctx.videoRef.current.srcObject = stream;
			}
		};

		setupCamera();

		return () => {
			if (ctx.videoRef.current && ctx.videoRef.current.srcObject) {
				(ctx.videoRef.current.srcObject as MediaStream)
					.getTracks()
					.forEach((track) => track.stop());
			}
		};
	}, []);

	return (
		<div className={styles.videoPlayer}>
			{!ctx.playing ? (
				<video
					ref={ctx.videoRef}
					autoPlay
					muted
					className={styles.recordVideo}
				></video>
			) : (
				ctx.videoBlob && (
					<video
						ref={ctx.playbackRef}
						autoPlay
						className={styles.playVideo}
					></video>
				)
			)}
			<div className={styles.timeElapsed}>{time}</div>
			{/* <div className={styles.timeElapsed}>0000:00:00</div> */}
		</div>
	);
};

export default VideoPlayer;
