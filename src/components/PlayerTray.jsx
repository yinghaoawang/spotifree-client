import { useContext, useState } from 'react';
import Youtube from 'react-youtube';
import { PlayerContext, Statuses } from '../contexts/PlayerContext';

export default function PlayerTray() {
  const { videoId, status, setStatus, player, setPlayer } =
    useContext(PlayerContext);

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

  return (
    <>
      <div
        id='tray'
        style={{
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        
        <button
          onClick={handleClickPlay}
          disabled={status === !Statuses.UNSTARTED}
        >
          {status === Statuses.PLAYING ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  );
}
