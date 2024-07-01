"use client";

import VideoContext from "./video-context";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Riders {
	name: string;
	sumAssured: number;
}

interface Feedback {
	question: string;
	rating: number;
}

interface User {
	referalNumber: number;
	proposalNumber: number;
	customerCompleteName: string;
	dob: string;
	registeredMobileNumber: number;
	registeredEmailAddress: string;
	completeAddress: string;
	planName: string;
	sumAssured: number;
	lifeInsuredName: string;
	premiumAmount: number;
	premiumPayingTerm: number;
	policyTerm: number;
	premiumPaying: string;
	riderDetails: Riders[];
	script: string;
	feedback: Feedback[];
	additionalComments: string;
	disagreement: string[];
	userId: string;
}

const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}): any => {
	const [recording, setRecording] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);
	const [playing, setPlaying] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<string | null>(null);
	const [isFullPlayed, setIsFullPlayed] = useState<boolean>(false);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null
	);
	const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
	const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const playbackRef = useRef<HTMLVideoElement>(null);
	const [time, setTime] = useState<number>(0);
	const [videoTime, setVideoTime] = useState<number>(0);
	const timeInterval = useRef<NodeJS.Timeout | undefined>(undefined);
	const stopTimeInterval = useRef<NodeJS.Timeout | undefined>(undefined);
	const router = useRouter();
	const videoExtension = "mp4";
	const [user, setUser] = useState<User>({
		referalNumber: 0,
		proposalNumber: 0,
		customerCompleteName: "",
		dob: "",
		registeredMobileNumber: 0,
		registeredEmailAddress: "",
		completeAddress: "",
		planName: "",
		sumAssured: 0,
		lifeInsuredName: "",
		premiumAmount: 0,
		premiumPayingTerm: 0,
		policyTerm: 0,
		premiumPaying: "",
		riderDetails: [],
		script: "",
		feedback: [],
		additionalComments: "",
		disagreement: [],
		userId: "",
	});

	const stopRecording = () => {
		clearInterval(timeInterval.current);
		setVideoTime(time);
		if (mediaRecorder) {
			mediaRecorder.stop();
			if (videoRef.current && videoRef.current.srcObject) {
				(videoRef.current.srcObject as MediaStream)
					.getTracks()
					.forEach((track) => track.stop());
			}
			setRecording(false);
			setPaused(false);
			setPlaying(true);
		} else {
			console.error("mediaRecorder is not available");
		}
	};

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
		const options = {
			audioBitsPerSecond: 128000,
			videoBitsPerSecond: 2500000,
			mimeType: `video/webm;codecs=av1`,
		};
		const recorder = new MediaRecorder(stream, options);
		const chunks: Blob[] = [];
		recorder.ondataavailable = (event: BlobEvent) => {
			if (event.data.size > 0) {
				chunks.push(event.data);
			}
		};
		recorder.onstop = () => {
			const completeBlob = new Blob(chunks, {
				type: `video/${videoExtension}`,
			});
			setVideoBlob(completeBlob);
		};
		recorder.start();
		setMediaRecorder(recorder);
		setPaused(false);
		setRecording(true);
		timeInterval.current = setInterval(() => {
			setTime((state) => state + 10);
		}, 10);
	};

	const playVideo = () => {
		setTime(0);
		clearInterval(timeInterval.current);
		if (videoBlob && playbackRef.current) {
			const trimmedVideoURL = URL.createObjectURL(videoBlob);
			playbackRef.current.src = trimmedVideoURL;
			playbackRef.current.play().catch((error) => {
				console.error("Failed to start video playback:", error);
			});
			timeInterval.current = setInterval(() => {
				setTime((state) => state + 10);
			}, 10);
			stopTimeInterval.current = setTimeout(() => {
				clearInterval(timeInterval.current);
				setIsFullPlayed(true);
			}, videoTime);
		} else {
			console.error(
				"trimmedVideoBlob is not available or PlaybackRef.current is null"
			);
		}
	};

	const pauseRecording = () => {
		clearInterval(timeInterval.current);
		if (mediaRecorder && mediaRecorder.state === "recording") {
			mediaRecorder.pause();
			setPaused(true);
		}
	};

	const resumeRecording = () => {
		if (mediaRecorder && mediaRecorder.state === "paused") {
			timeInterval.current = setInterval(() => {
				setTime((state) => state + 10);
			}, 10);
			mediaRecorder.resume();
			setPaused(false);
		}
	};

	const resetRecording = async () => {
		setVideoTime(0);
		setIsFullPlayed(false);
		clearTimeout(stopTimeInterval.current);
		clearInterval(timeInterval.current);
		setPlaying(false);
		setVideoBlob(null);
		setRecording(false);
		setPaused(false);
		setTime(0);
		if (playbackRef.current) {
			playbackRef.current.src = "";
		}
		if (videoRef.current && videoRef.current.srcObject) {
			(videoRef.current.srcObject as MediaStream)
				.getTracks()
				.forEach((track) => track.stop());
		}
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
		// router.push("/");
	};

	const confirmRecording = async () => {
		setIsFullPlayed(false);
		clearInterval(timeInterval.current);
		clearTimeout(stopTimeInterval.current);
		// router.push("/review");
	};

	const submitRecording = async () => {
		setIsFullPlayed(false);
		// router.replace("/submitted");
		if (!videoBlob) {
			console.error("No video to submit");
			return;
		}
		const formData = new FormData();
		setSubmitting(null);
		formData.append("video", videoBlob, `recording.${videoExtension}`);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_API_URL}/videos/uploads`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log("Video submitted successfully:", response.data);
				router.replace("/14");
				// router.replace("/submitted");
				setSubmitting("Video submitted successfully!");
			})
			.catch((error) => {
				console.error("Error submitting video:", error);
				setSubmitting("Error Submitting Video");
				// router.replace("/submitted");
			});
	};

	const capturePhoto = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			const video = document.createElement("video");
			video.srcObject = stream;
			await new Promise<void>((resolve) => {
				video.onloadedmetadata = () => {
					video.play();
					resolve();
				};
			});
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const context = canvas.getContext("2d");
			context?.drawImage(video, 0, 0, canvas.width, canvas.height);
			const photoBlob = await new Promise<Blob | null>((resolve) => {
				canvas.toBlob((blob) => {
					resolve(blob);
				}, "image/jpeg");
			});
			stream.getTracks().forEach((track) => track.stop());
			setPhotoBlob(photoBlob);
		} catch (error) {
			console.error("Error capturing photo:", error);
		}
	};

	const resetPhoto = async () => {
		setPhotoBlob(null);
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
		return () => {
			if (videoRef.current && videoRef.current.srcObject) {
				(videoRef.current.srcObject as MediaStream)
					.getTracks()
					.forEach((track) => track.stop());
			}
			setPhotoBlob(null);
		};
	};

	return (
		<VideoContext.Provider
			value={{
				recording,
				paused,
				playing,
				submitting,
				time,
				isFullPlayed,
				mediaRecorder,
				videoBlob,
				photoBlob,
				videoRef,
				playbackRef,
				capturePhoto,
				startRecording,
				playVideo,
				stopRecording,
				pauseRecording,
				resumeRecording,
				resetRecording,
				resetPhoto,
				confirmRecording,
				submitRecording,
				user,
			}}
		>
			{children}
		</VideoContext.Provider>
	);
};

export default VideoProvider;
