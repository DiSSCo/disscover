/* Import Dependencies */
import { useEffect, useState, useRef, useCallback } from "react";
import moment from "moment";
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './audioPlayer.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


/* Props Typing */
interface Props {
    accessURI: string
};


/**
 * Component that renders an audio player for playing, pausing and stopping audio
 * @param accessURI The URL on which the media can be accessed
 * @returns 
 */
const AudioPlayer = (props: Props) => {
    const { accessURI } = props;

    /* Hooks */
    const audioRef = useRef<HTMLAudioElement>(null);
    const rangeRef = useRef<HTMLInputElement>(null);
    let playAnimationRef = useRef<number>(null);

    /* Base variables */
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState<number | string>(0);

    /* Function for repeating the frame animation, allowing the progress bar to progress */
    const Repeat = useCallback(() => {
        if (audioRef.current && rangeRef.current) {
            const audioPlayer = audioRef.current;
            const audioRange = rangeRef.current;

            audioRange.value = String(audioPlayer.currentTime);
            audioRange.style.setProperty(
                '--range-progress',
                `${(Number(audioRange.value) / Number(duration)) * 100}%`
            )

            playAnimationRef = { ...playAnimationRef, current: requestAnimationFrame(Repeat) };
        }
    }, []);

    /* Function for playing and pausing audio */
    useEffect(() => {
        if (audioRef.current) {
            const audioPlayer = audioRef.current;

            if (isPlaying) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            playAnimationRef = { ...playAnimationRef, current: requestAnimationFrame(Repeat) };
        }
    }, [isPlaying, audioRef, Repeat]);

    /* Function for OnChange of Audio progress: update progress bar */
    const HandleRangeChange = () => {
        const audioPlayer = audioRef.current as HTMLAudioElement;
        const audioRange = rangeRef.current as HTMLInputElement;

        audioPlayer.currentTime = Number(audioRange.value);
    }

    /* Function for tracking the audio duration and total time */
    const OnLoadedMetadata = () => {
        const audioPlayer = audioRef.current as HTMLAudioElement;
        const audioRange = rangeRef.current as HTMLInputElement;

        setDuration(moment.utc(audioPlayer.duration * 1000).format('m:ss'));
        audioRange.max = String(Math.round(audioPlayer.duration));
    }

    return (
        <div className={`${styles.audioPlayer} rounded-full px-3 py-2`}>
            <audio src={accessURI}
                ref={audioRef}
                onLoadedMetadataCapture={() => OnLoadedMetadata()}
                onEnded={() => { setIsPlaying(false) }}
            />

            <Row className="align-items-center">
                <Col className="col-md-auto pe-0 ">
                    <FontAwesomeIcon icon={!isPlaying ? faPlay : faPause}
                        className="c-primary c-pointer"
                        onClick={() => setIsPlaying(!isPlaying)}
                    />
                </Col>
                <Col className="d-flex align-items-center">
                    <input type="range"
                        ref={rangeRef}
                        className={`${styles.audioRange} w-100`}
                        onChange={() => HandleRangeChange()}
                    />
                </Col>
                <Col className="col-md-auto ps-0">
                    <span className="fs-4"> {duration} </span>
                </Col>
                <Col className="col-md-auto ps-0">
                    <FontAwesomeIcon icon={faInfoCircle}
                        className="c-primary"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AudioPlayer;