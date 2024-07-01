import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ErrorModal.module.css";
import Button from "../ui/Button";

interface ModalProps {
	error: string[];
	buttonString: string;
	isInputAvailable?: boolean;
	errorHander: any;
}

const Modal: React.FC<ModalProps> = ({
	error,
	buttonString,
	isInputAvailable,
	errorHander
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const clickHandler = () => {
		errorHander(inputRef?.current?.value);
	}

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || typeof window === "undefined") {
		return null;
	}

	return ReactDOM.createPortal(
		<div className={styles.modal}>
			<div className={styles.card}>
				{error.map((item, index) => (
					<div
						key={index}
						className={styles.item}
					>
						{item}
					</div>
				))}
				{isInputAvailable && (
					<input
						type="text"
						required
						name="input"
						className={styles.input}
						ref={inputRef}
					/>
				)}
				<Button
					className={styles.controlButton}
					onClick={clickHandler}
				>
					{buttonString}
				</Button>
			</div>
		</div>,
		document.getElementById("modal-root") as HTMLElement
	);
};

export default Modal;
