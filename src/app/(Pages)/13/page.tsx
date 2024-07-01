"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import VideoContext from "@/app/store/video-context";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const ctx = useContext(VideoContext);
	const router = useRouter();
	const [time, setTime] = useState<string>("0:0:0");
	const [minTimeMet, setMinTimeMet] = useState<boolean>(false);
	const [script, setScript] = useState<string>("");
	const shouldContinueRef = useRef<boolean>(true);

	useEffect(() => {
		if (
			process.env.NEXT_PUBLIC_MIN_DURATION &&
			process.env.NEXT_PUBLIC_MAX_DURATION
		) {
			const minDuration = parseInt(process.env.NEXT_PUBLIC_MIN_DURATION);
			const maxDuration = parseInt(process.env.NEXT_PUBLIC_MAX_DURATION);
			if (ctx.time < 1000 * minDuration) {
				setMinTimeMet(false);
			} else {
				setMinTimeMet(true);
			}
			if (ctx.time > 1000 * maxDuration) {
				ctx.stopRecording();
				ctx.confirmRecording();
				router.refresh();
				setScript("");
				shouldContinueRef.current = false;
			}
		}
	}, [ctx.time]);

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

	useEffect(() => {
		console.log(ctx.user);
	});

	const clickHandler = () => {
		router.replace("/14");
	};

	const pause = async (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const scriptWritter = async () => {
		const src =
			"I have test. Last., contact number 8587922643 and email id Alok.k@testyantra.com and am applying for a life insurance policy iSelect Smart360 from Canara HSBC Life Insurance Company Limited for a period of 10 years. I agree to pay a premium of Rs 33819.0 for an annual 5 years. All product features, including death and other benefits, have been explained to me and are part of the description of the benefit I agreed to. I hereby confirm that I have correctly provided all the material information required, including health related questions, please consider this as my consent to process the application.";
		const srcArray = src.split(" ");
		console.log(srcArray);
		setScript("");
		shouldContinueRef.current = true;
		for (let i = 0; i < srcArray.length; i++) {
			if (!shouldContinueRef.current) {
				break;
			}
			setScript((state) => state + " " + srcArray[i]);
			await pause(500);
		}
	};

	return (
		<>
			<div className={`${styles.heading}`}>Video Consent</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>
					Proposal Number: 1234567890
				</div>
			</div>
			<div className={styles.flex}>
				<div className={true ? styles.detected : styles.notDetected}>
					Light Detected
				</div>
				<div className={true ? styles.detected : styles.notDetected}>
					Face Detected
				</div>
				<div className={true ? styles.detected : styles.notDetected}>
					Liveliness Check
				</div>
				<div className={false ? styles.detected : styles.notDetected}>
					Spoof Detected
				</div>
			</div>
			<div className={styles.permissionCard}>
				<div className={styles.image}>
					{!ctx.playing ? (
						<video
							ref={ctx.videoRef}
							autoPlay
							muted
							className={styles.recordVideo}
						></video>
					) : (
						ctx.videoBlob && (
							<div
								className={styles.recordVideo}
							></div>
						)
					)}
					<div className={styles.timeElapsed}>{time}</div>
				</div>
				{!(
					ctx.recording ||
					ctx.paused ||
					ctx.playing ||
					!!ctx.videoBlob
				) && (
					<Button
						onClick={() => {
							ctx.startRecording();
							scriptWritter();
						}}
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
				{!(!ctx.recording || !minTimeMet) && (
					<Button
						onClick={() => {
							ctx.stopRecording();
							ctx.confirmRecording();
							setScript("");
							shouldContinueRef.current = false;
						}}
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
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>Script</div>
					<div className={styles.field}>{script}</div>
				</div>
			</div>
			<div className={styles.flex}>
				{ctx.videoBlob && (
					<Button
						onClick={ctx.submitRecording}
						disabled={!ctx.videoBlob}
						className={styles.controlButton}
					>
						Submit Video
					</Button>
				)}
			</div>
		</>
	);
};

export default Welcome;
