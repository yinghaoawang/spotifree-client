import { useContext } from 'react';
import { opts, PlayerContext, Statuses } from '../contexts/PlayerContext';
import { SongContext } from '../contexts/SongContext';
import Youtube from 'react-youtube';
import { UserContext } from '../contexts/UserContext';
import useFetch from '../hooks/useFetch';

export default function Player() {
  const { setStatus, player, setPlayer, volume, repeat } =
    useContext(PlayerContext);
  const fetch = useFetch();

  const { videoId, artSrc, title, artist, setPlays } = useContext(SongContext);
  const { token } = useContext(UserContext);

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
      onEnd={async (e) => {
        try {
          console.log(token);
          setPlays((prevPlays) => prevPlays + 1);
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/user/add_play`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                video_id: videoId,
                title,
                artist_name: artist,
                duration: e.target.getDuration(),
                art_src: artSrc
              })
            }
          );

          if (!response.ok) {
            throw new Error('Add play failed');
          }
          const res = await response.json();
          console.log(res);
        } catch (err) {
          console.error(err);
        }

        if (repeat) {
          player.playVideo();
        } else {
          setStatus(Statuses.PAUSED);
        }
      }}
    />
  );
}
