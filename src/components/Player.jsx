import { useContext } from 'react';
import { opts, PlayerContext, Statuses } from '../contexts/PlayerContext';
import Youtube from 'react-youtube';

export default function Player() {
  const { videoId, setStatus, player, setPlayer, volume, repeat } =
    useContext(PlayerContext);

  return (
    <Youtube
      style={{ height: 0, width: 0 }}
      videoId={videoId}
      opts={opts}
      onReady={(e) => {
        setPlayer(e.target);
        setStatus(Statuses.PAUSED);
        e.target.pauseVideo();
        e.target.setVolume(volume);
      }}
      onPlay={() => setStatus(Statuses.PLAYING)}
      onPause={() => setStatus(Statuses.PAUSED)}
      onEnd={() => {
        if (repeat) {
          player.playVideo();
        } else {
          setStatus(Statuses.PAUSED);
        }
      }}
    />
  );
}
