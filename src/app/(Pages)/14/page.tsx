"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import VideoContext from "@/app/store/video-context";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const ctx = useContext(VideoContext);
	const router = useRouter();
	const inputRef1 = useRef<HTMLInputElement | null>(null);
	const inputRef2 = useRef<HTMLInputElement | null>(null);
	const inputRef3 = useRef<HTMLInputElement | null>(null);
	const inputRef4 = useRef<HTMLInputElement | null>(null);
	const inputRef5 = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		console.log(ctx.user);
	});

	const clickHandler = () => {
		router.replace("/15and16");
		ctx.user.feedback.push({ rating: inputRef1?.current?.value });
		ctx.user.feedback.push({ rating: inputRef2?.current?.value });
		ctx.user.feedback.push({ rating: inputRef3?.current?.value });
		ctx.user.feedback.push({ rating: inputRef4?.current?.value });
		ctx.user.feedback.push({ rating: inputRef5?.current?.value });
	};

	return (
		<>
			<div className={`${styles.heading}`}>Feedback</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>
					Proposal Number: 1234567890
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.infoItem}>Rate On The Scale Of 1-10</div>
			</div>
			<div className={styles.personalInfo}>
				<div className={styles.detail}>
					<div className={styles.label}>
						1. How Easy Was This Process For You?
					</div>
					<input
						type="number"
						className={styles.field}
						required
						ref={inputRef1}
						min={1}
						max="10"
						step={1}
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>
						2. How Did Your Find The Pace/ Speed Of This Process?
					</div>
					<input
						type="number"
						className={styles.field}
						required
						ref={inputRef2}
						min={1}
						max={10}
						step={1}
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>
						3. How Would You Rate The User Interface?
					</div>
					<input
						type="number"
						className={styles.field}
						required
						ref={inputRef3}
						min={1}
						max={10}
						step={1}
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>
						4. Was The Automated Voice And Instruction Provided
						Clear And Easy To Understand?
					</div>
					<input
						type="number"
						className={styles.field}
						required
						ref={inputRef4}
						min={1}
						max={10}
						step={1}
					></input>
				</div>
				<div className={styles.detail}>
					<div className={styles.label}>
						5. How Fast Was The Overall Loading Time And Waiting
						Time Experience?
					</div>
					<input
						type="number"
						className={styles.field}
						required
						ref={inputRef5}
						min={1}
						max={10}
						step={1}
					/>
				</div>
			</div>
			<div className={styles.flex}>
				<Button
					className={styles.controlButton}
					onClick={clickHandler}
				>
					Agree
				</Button>
			</div>
		</>
	);
};

export default Welcome;
