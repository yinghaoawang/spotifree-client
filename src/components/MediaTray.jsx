import { useState } from 'react';
import Youtube from 'react-youtube';

const Statuses = Object.freeze({
  STARTING: 0,
  PAUSED: 1,
  PLAYING: 2
});

export default function MediaTray() {
  const [mediaPlayer, setMediaPlayer] = useState();
  const [status, setStatus] = useState(Statuses.STARTING);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1
    }
  };

  const handleClickPlay = () => {
    if (mediaPlayer == null || status === Statuses.STARTING) return;
    console.log(status);
    setStatus((prevStatus) => {
      console.log(prevStatus);
      if (prevStatus === Statuses.PAUSED) {
        mediaPlayer.playVideo();
        console.log('playing');
        return Statuses.PLAYING;
      } else {
        mediaPlayer.pauseVideo();
        console.log('paused');
        return Statuses.PAUSED;
      }
    });
  };

  const _onReady = (e) => {
    setMediaPlayer(e.target);
    e.target.pauseVideo();
    setStatus(Statuses.PAUSED);
  };

  return (
    <div id='tray' style={{ backgroundColor: 'white' }}>
      <Youtube videoId='tgbNymZ7vqY' opts={opts} onReady={_onReady} />
      <button
        onClick={handleClickPlay}
        disabled={status === !Statuses.STARTING}
      >
        {status === Statuses.PLAYING ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
