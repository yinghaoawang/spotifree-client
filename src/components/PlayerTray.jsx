import { useContext, useState } from 'react';
import Youtube from 'react-youtube';
import { PlayerContext, Statuses } from '../contexts/PlayerContext';

export default function PlayerTray() {
  const { videoId, status, setStatus, player, setPlayer } =
    useContext(PlayerContext);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1
    }
  };

  const handleClickPlay = () => {
    if (player == null || status === Statuses.UNSTARTED) return;
    console.log(status);
    setStatus((prevStatus) => {
      console.log(prevStatus);
      if (prevStatus === Statuses.PAUSED) {
        player.playVideo();
        console.log('playing');
        return Statuses.PLAYING;
      } else {
        player.pauseVideo();
        console.log('paused');
        return Statuses.PAUSED;
      }
    });
  };

  const _onReady = (e) => {
    setPlayer(e.target);
    e.target.pauseVideo();
    setStatus(Statuses.PAUSED);
  };

  return (
    <div id='tray' style={{ backgroundColor: 'black' }}>
      <Youtube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
        onPlay={() => setStatus(Statuses.PLAYING)}
        onPause={() => setStatus(Statuses.PAUSED)}
        onEnd={() => setStatus(Statuses.PAUSED)}
      />
      <button
        onClick={handleClickPlay}
        disabled={status === !Statuses.UNSTARTED}
      >
        {status === Statuses.PLAYING ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
