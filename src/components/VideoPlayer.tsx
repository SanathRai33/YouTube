import React, { useRef } from 'react'

function VideoPlayer({video}: any) {
    
    const videos = "/videos/vdo.mp4";
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // useEffect(()=>{
    //     const videoElement = videoRef.current;
    //     if (videoElement) {
    //         videoElement.addEventListener;
    //         videoRef.current.play();
    //     }
    // })

  return (
    <div className='aspect-video bg-black rounded-lg overflow-hidden'>
      <video ref={videoRef} className='w-100 h-full' controls>
        <source src={videos} type='video/mp4'  />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
