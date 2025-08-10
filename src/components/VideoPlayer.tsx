import React, { useRef, useState, useEffect } from "react";

function VideoPlayer({ video, onNextVideo, onCloseWebsite, onToggleComments }: { 
  video: any, 
  onNextVideo?: () => void, 
  onCloseWebsite?: () => void,
  onToggleComments?: () => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastTap, setLastTap] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
  const [showSkipIndicator, setShowSkipIndicator] = useState(false);
  const [skipDirection, setSkipDirection] = useState<"forward" | "backward">("forward");
  const [skipAmount, setSkipAmount] = useState(10);

  const handleTap = (e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    const TRIPLE_TAP_DELAY = 500;
    
    // Get touch position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Get video element dimensions
    const videoRect = e.currentTarget.getBoundingClientRect();
    const x = clientX - videoRect.left;
    const y = clientY - videoRect.top;
    
    // Normalize position (0-1)
    const normalizedX = x / videoRect.width;
    const normalizedY = y / videoRect.height;
    
    setTapPosition({ x: normalizedX, y: normalizedY });

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      setTapCount(prev => prev + 1);
    } else {
      setTapCount(1);
    }
    setLastTap(now);

    // Handle the tap after a short delay to allow for multiple taps
    setTimeout(() => {
      if (tapCount === 1) {
        // Single tap - center area
        if (normalizedX > 0.3 && normalizedX < 0.7 && normalizedY > 0.3 && normalizedY < 0.7) {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        }
      } else if (tapCount === 2) {
        // Double tap
        if (normalizedX > 0.7) { // Right side
          if (videoRef.current) {
            videoRef.current.currentTime += skipAmount;
            setSkipDirection("forward");
            setShowSkipIndicator(true);
            setTimeout(() => setShowSkipIndicator(false), 500);
          }
        } else if (normalizedX < 0.3) { // Left side
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - skipAmount);
            setSkipDirection("backward");
            setShowSkipIndicator(true);
            setTimeout(() => setShowSkipIndicator(false), 500);
          }
        }
      } else if (tapCount === 3) {
        // Triple tap
        if (normalizedX > 0.7) { // Right side
          if (onCloseWebsite) onCloseWebsite();
        } else if (normalizedX < 0.3) { // Left side
          if (onToggleComments) onToggleComments();
        } else { // Center
          if (onNextVideo) onNextVideo();
        }
      }
    }, TRIPLE_TAP_DELAY);
  };

  return (
    <div 
      className="aspect-video bg-black rounded-lg overflow-hidden max-w-[853px] max-h-[480px] relative"
      onTouchStart={handleTap}
      onClick={handleTap}
    >
      {video.public_id ? (
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          width="100%"
          height="100%"
          src={`https://player.cloudinary.com/embed/?cloud_name=${process.env.CLOUDINARY_CLOUD_NAME}&public_id=${video.public_id}`}
          controls={false}
        ></video>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls={false}
          src={video.filepath}
        />
      )}

      {/* Skip indicator */}
      {showSkipIndicator && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
          <div className={`flex items-center justify-center p-4 bg-transparent bg-opacity-0 w-full h-full`}>
            <div className="flex justify-between items-end w-full h-full">
              {skipDirection === "backward" ? (
                <div className="w-70 h-full rounded-l-full text-black bg-white opacity-30 flex justify-end items-center transition-opacity duration-200 ease-in-out">
                <div className="w-50 h-full rounded-l-full text-black bg-white opacity-50 flex justify-start items-center transition-opacity duration-250 ease-in-out">
                  <svg fill="none" className="w-10" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-black text-2xl font-bold mx-2 ">
                    {skipAmount}s
                  </span>
                </div>
                </div>
              ):<div className="w-70 h-full rounded-l-full text-black bg-transparent opacity-30 flex justify-end items-center">
                </div>}
              {/* <span className="text-black text-2xl font-bold mx-2 bg-green-600">
                {skipAmount}s
              </span> */}
              {skipDirection === "forward" ? (
                <div className="w-70 h-full rounded-r-full text-black bg-white opacity-30 flex justify-end items-center transition-opacity duration-200 ease-in-out">
                <div className="w-50 h-full rounded-r-full text-black bg-white opacity-50 flex justify-start items-center transition-opacity duration-250 ease-in-out">
                  <span className="text-black text-2xl font-bold mx-2 ">
                    {skipAmount}s
                  </span>
                  <svg fill="none" className="w-10" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                </div>
              ):<div className="w-70 h-full rounded-r-full text-black bg-transparent opacity-30 flex justify-end items-center">
                </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;