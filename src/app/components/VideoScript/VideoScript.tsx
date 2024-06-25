import styles from "./VideoScript.module.css";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const VideoScript = () => {
  const [textSize, setTextSize] = useState<number>(16);
  const [data, setData] = useState<{ data: string } | null>(null);

  const increaseSizeByTwo = () => {
    if (textSize < 36) {
      setTextSize((state) => state + 2);
    }
  };

  const decreaseSizeByTwo = () => {
    if (textSize > 12) {
      setTextSize((state) => state - 2);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/videos/scripts`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.videoContent}>
      <div className={styles.heading}>
        <div className={styles.headingText}>Script</div>
        <div className={styles.scriptSize}>
          <p className={styles.textSizeHeading}>Font Size</p>
          <Button
            className={styles.scriptSizeButton}
            onClick={increaseSizeByTwo}
          >
            +
          </Button>
          <p className={styles.textSize}>{textSize}</p>
          <Button
            className={styles.scriptSizeButton}
            onClick={decreaseSizeByTwo}
          >
            -
          </Button>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className={styles.script} style={{ fontSize: `${textSize}px` }}>
        {data && <div>{data.data}</div>}
        {!data && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default VideoScript;
