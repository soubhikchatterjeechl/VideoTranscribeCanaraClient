import { useContext, useEffect, useState } from "react";
import styles from "./ControlButtons.module.css";
import VideoContext from "../../store/video-context";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const ControlButtons = () => {
  const ctx = useContext(VideoContext);
  const [minTimeMet, setMinTimeMet] = useState<boolean>(false);
  const router = useRouter();

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
        router.push("/review");
      }
    }
  }, [ctx.time]);

  return (
    <>
      <div className={styles.controlButtons}>
        {!(ctx.recording || ctx.paused || ctx.playing || !!ctx.videoBlob) && (
          <Button
            onClick={ctx.startRecording}
            disabled={
              ctx.recording || ctx.paused || ctx.playing || !!ctx.videoBlob
            }
            className={styles.controlButton}
          >
            Start Recording
          </Button>
        )}
        {!(!ctx.recording || ctx.paused) && (
          <Button
            onClick={ctx.pauseRecording}
            disabled={!ctx.recording || ctx.paused}
            className={styles.controlButton}
          >
            Pause Recording
          </Button>
        )}
        {!(!ctx.recording || !ctx.paused) && (
          <Button
            onClick={ctx.resumeRecording}
            disabled={!ctx.recording || !ctx.paused}
            className={styles.controlButton}
          >
            Resume Recording
          </Button>
        )}
        {!(!ctx.recording || !minTimeMet) && (
          <Button
            onClick={() => {
              ctx.stopRecording();
              ctx.confirmRecording();
              router.push("/review");
            }}
            disabled={!ctx.recording || !minTimeMet}
            className={styles.controlButton}
          >
            Stop Recording
          </Button>
        )}
      </div>
    </>
  );
};

export default ControlButtons;
