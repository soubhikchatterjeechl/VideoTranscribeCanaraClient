import "./../globals.css";
import styles from "./layout.module.css";
import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.pageLayout}>
			<div className={styles.mainContainer}>
				<div id="modal-root"></div>
				<div className={styles.image}>
					<Image
						src="/companyLogo.png"
						width={160}
						height={80}
						alt="Picture of the author"
					/>
				</div>
				{children}
			</div>
		</div>
	);
}
