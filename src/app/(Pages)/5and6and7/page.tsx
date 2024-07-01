"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import ErrorModal from "./../../components/ErrorModal/ErrorModal";
import VideoContext from "@/app/store/video-context";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const [isError, setIsError] = useState<boolean>(false);
	const ctx = useContext(VideoContext);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		if (ctx.photoBlob) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [ctx.photoBlob]);

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

	const handleClick = () => {
		router.replace("/8");
	};

	return (
		<>
			{isError && (
				<ErrorModal
					error={[
						"Your Face Does not Match With Your Id Card. Please Try Again!",
					]}
					buttonString={"Try Again"}
				/>
			)}
			<div className={`${styles.heading}`}>Photo Consent</div>
			<div className={`${styles.script}`}>Take A Selfie</div>
			<div className={styles.permissionCard}>
				<div className={styles.image}>
					{!ctx.photoBlob ? (
						<video
							ref={ctx.videoRef}
							autoPlay
							muted
							className={styles.recordVideo}
						></video>
					) : (
						<Image
							className={styles.recordVideo}
							src={URL.createObjectURL(ctx.photoBlob)}
							alt="Captured"
							width={280}
							height={210}
						/>
					)}
				</div>
				{!ctx.photoBlob ? (
					<Button
						className={styles.controlButton}
						onClick={ctx.capturePhoto}
					>
						Take A Photo
					</Button>
				) : (
					<Button
						className={styles.controlButton}
						onClick={ctx.resetPhoto}
					>
						Take Photo Again
					</Button>
				)}
			</div>
			<div className={`${styles.referenceNumber}`}>Match Score: 90</div>
			{!loading && (
				<Button
					className={styles.navigationButton}
					onClick={handleClick}
				>
					Proceed
				</Button>
			)}
		</>
	);
};

export default Welcome;
