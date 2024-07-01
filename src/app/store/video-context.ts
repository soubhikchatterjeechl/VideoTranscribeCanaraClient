"use client";

import React from "react";

interface Riders {
	name: string;
	sumAssured: number;
}

interface Feedback {
	question?: string;
	rating?: string;
}

interface VideoContextType {
	recording: boolean;
	paused: boolean;
	playing: boolean;
	submitting: string | null;
	time: number;
	isFullPlayed: boolean;
	mediaRecorder: MediaRecorder | null;
	videoBlob: Blob | null;
	photoBlob: Blob | null;
	videoRef: React.RefObject<HTMLVideoElement>;
	playbackRef: React.RefObject<HTMLVideoElement>;
	capturePhoto: () => Promise<void>;
	startRecording: () => Promise<void>;
	playVideo: () => void;
	stopRecording: (recorder?: MediaRecorder) => void;
	pauseRecording: () => void;
	resumeRecording: () => void;
	resetRecording: () => Promise<void>;
	resetPhoto: () => Promise<() => void>;
	confirmRecording: () => void;
	submitRecording: () => Promise<void>;
	user: {
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
		userid: string;
	};
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
	photoBlob: null,
	videoRef: { current: null },
	playbackRef: { current: null },
	capturePhoto: async () => {},
	startRecording: async () => {},
	playVideo: () => {},
	stopRecording: () => {},
	pauseRecording: () => {},
	resumeRecording: () => {},
	resetRecording: async () => {},
	resetPhoto: async () => () => {},
	confirmRecording: () => {},
	submitRecording: async () => {},
	user: {
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
		userid: "",
	},
});

export default VideoContext;
