import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";

interface AudioPlayerProps {
  audio: string;
  className: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveformContainerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformContainerRef.current,
      waveColor: "#CFCFCF",
      progressColor: "#4A8C67",
      url: audio,
      barWidth: 2,
      barGap: 1,
      height: 40,
    });

    const handleResize = () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.load(audio);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      wavesurferRef.current?.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full md:space-x-2 space-y-2 md:space-y-0 p-2 bg-[#FAFAFA]">
      <button onClick={handlePlayPause} className="focus:outline-none ">
        <Image
          src={isPlaying ? "/svgs/Pause.svg" : "/svgs/playbutton.svg"}
          alt={isPlaying ? "Pause" : "Play"}
          className="w-[28px] h-[28px] object-cover"
          width={28}
          height={28}
        />
      </button>

      <div
        ref={waveformContainerRef}
        className={className}
      ></div>
    </div>
  );
};

export default AudioPlayer;
