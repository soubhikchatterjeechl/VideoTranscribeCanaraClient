"use client";

import React from "react";

interface VideoContextType {
	recording: boolean;
	paused: boolean;
	playing: boolean;
	submitting: string | null;
	time: number;
	isFullPlayed: boolean;
	mediaRecorder: MediaRecorder | null;
	videoBlob: Blob | null;
	videoRef: React.RefObject<HTMLVideoElement>;
	playbackRef: React.RefObject<HTMLVideoElement>;
	startRecording: () => Promise<void>;
	playVideo: () => void;
	stopRecording: (recorder ?: MediaRecorder) => void;
	pauseRecording: () => void;
	resumeRecording: () => void;
	resetRecording: () => Promise<void>;
	confirmRecording: () => void;
	submitRecording: () => Promise<void>;
}

const VideoContext = React.createContext<VideoContextType>({
	recording: false,
	paused: false,
	playing: false,
	submitting: null,
	time: 0,
	isFullPlayed: false,
	mediaRecorder: null,
	videoBlob: null,
	videoRef: { current: null },
	playbackRef: { current: null },
	startRecording: async () => {},
	playVideo: () => {},
	stopRecording: () => {},
	pauseRecording: () => {},
	resumeRecording: () => {},
	resetRecording: async () => {},
	confirmRecording: () => {},
	submitRecording: async () => {},
});

export default VideoContext;
