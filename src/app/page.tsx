"use client";

import styles from "./page.module.css";
import VideoScript from "./components/VideoScript/VideoScript";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ControlButtons from "./components/ControlButtons/ControlButtons";

export default function Home() {

	return (
		<div className={styles.main}>
			<div className={styles.record}>
				<VideoPlayer />
				<ControlButtons />
			</div>
			<VideoScript />
		</div>
	);
}
