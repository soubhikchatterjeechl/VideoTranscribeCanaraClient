"use client";
import styles from "./page.module.css";
import Button from "@/app/components/ui/Button";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Welcome = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && File.length > 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadPhotoAndNavigate = async () => {
		const file = fileInputRef.current?.files?.[0];
		if (file && File.length > 0) {
			router.replace("/5and6and7");
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<div className={`${styles.heading}`}>ID Upload</div>
			<div className={`${styles.script}`}>
				Upload An Id Card With Photo
			</div>
			<div className={styles.permissionCard}>
				<input
					className={styles.controlButton}
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				<Button
					onClick={triggerFileInput}
					className={styles.controlButton}
				>
					Take Photo/ Select Id
				</Button>
				{selectedImage && (
					<div className={styles.preview}>
						<Image
							className={styles.image}
							src={selectedImage}
							alt="Selected preview"
							width={270}
							height={200}
						/>
					</div>
				)}
			</div>
			{selectedImage && <button
				className={styles.navigationButton}
				onClick={uploadPhotoAndNavigate}
			>
				Proceed
			</button>}
		</>
	);
};

export default Welcome;
