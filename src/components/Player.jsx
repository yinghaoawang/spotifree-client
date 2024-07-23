import { useContext } from 'react';
import { opts, PlayerContext, Statuses } from '../contexts/PlayerContext';
import Youtube from 'react-youtube';

export default function Player() {
  const { videoId, setStatus, setPlayer } =
    useContext(PlayerContext);

  return (
    <Youtube
      style={{ height: 0, width: 0 }}
      videoId={videoId}
      opts={opts}
      onReady={(e) => {
        setPlayer(e.target);
        e.target.pauseVideo();
        setStatus(Statuses.PAUSED);
      }}
      onPlay={() => setStatus(Statuses.PLAYING)}
      onPause={() => setStatus(Statuses.PAUSED)}
      onEnd={() => setStatus(Statuses.PAUSED)}
    />
  );
}
