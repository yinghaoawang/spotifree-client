import { useContext, useEffect, useState } from 'react';
import { PlayerContext, Statuses } from '../contexts/PlayerContext';
import { SongContext } from '../contexts/SongContext';

const SecondsToTimeString = (seconds) => {
  if (seconds == null) return 0;
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  if (timeString.substring(0, 3) === '00:')
    timeString = timeString.substring(3);
  if (timeString[0] === '0' && timeString[1] !== '0')
    timeString = timeString.substring(1);
  return timeString.length > 0 ? timeString : 0;
};

const MainControls = ({
  handleClickPlay,
  videoId,
  repeat,
  setRepeat,
  player,
  currTime,
  maxTime,
  status
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      placeItems: 'center',
      gap: '5px'
    }}
  >
    <div>
      <button
        style={{ padding: 5, borderRadius: 100, pointerEvents: 'none' }}
        disabled
      >
        🔀
      </button>
      <button
        onClick={handleClickPlay}
        disabled={
          status === Statuses.UNSTARTED ||
          status === Statuses.BUFFERING ||
          videoId == null ||
          videoId.trim().length === 0
        }
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 100,
          padding: 13
        }}
      >
        {status === Statuses.PLAYING ? '⏸️' : '▶️'}
      </button>
      <button
        style={{
          padding: 5,
          borderRadius: 100,
          opacity: repeat ? 1 : 0.5
        }}
        onClick={() => {
          if (player == null) return;

          setRepeat((prevRepeat) => {
            if (prevRepeat === true) {
              return false;
            } else {
              return true;
            }
          });
        }}
      >
        🔁
      </button>
    </div>
    <div style={{ display: 'flex', placeItems: 'center', gap: '3px' }}>
      <span>{SecondsToTimeString(currTime)}</span>
      <input
        type='range'
        value={currTime}
        onChange={(e) => {
          let val = e.target.value;
          if (val > maxTime) val = maxTime;
          else if (val < 0) val = 0;
          player.seekTo(val);
        }}
        min='0'
        max={maxTime}
      />
      <span>{SecondsToTimeString(maxTime)}</span>
    </div>
  </div>
);

const VolumeSlider = ({ player, volume, setVolume }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          placeItems: 'center',

          justifyContent: 'end',
          gap: '3px'
        }}
      >
        🔈
        <input
          type='range'
          value={volume}
          onChange={(e) => {
            let val = e.target.value;
            console.log(e.target.value);
            if (val > 100) val = 100;
            else if (val < 0) val = 0;
            player.setVolume(val);
            setVolume(val);
          }}
          min='0'
          max='100'
        />
        🔊
      </div>
    </>
  );
};

export default function PlayerTray() {
  const {
    videoId,
    status,
    setStatus,
    player,
    volume,
    setVolume,
    repeat,
    setRepeat
  } = useContext(PlayerContext);
  const { title, artist, artSrc, plays } = useContext(SongContext);

  const [maxTime, setMaxTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);

  const currTimeListener = () => {
    if (player == null) return;
    const ct = Math.floor(player.getCurrentTime());
    setCurrTime(ct);
    const mt = Math.floor(player.getDuration());
    setMaxTime(mt);
  };

  useEffect(() => {
    window.addEventListener('message', currTimeListener);
    console.log('message');

    return () => {
      window.removeEventListener('message', currTimeListener);
    };
  }, [player]);

  const handleClickPlay = () => {
    if (player == null || status === Statuses.UNSTARTED) return;
    console.log(status);
    setStatus((prevStatus) => {
      console.log(prevStatus);
      if (prevStatus === Statuses.PAUSED || prevStatus === Statuses.STOPPED) {
        player.playVideo();
        return Statuses.PLAYING;
      } else {
        player.pauseVideo();
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
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10
        }}
      >
        <div style={{ display: 'flex', width: '300px', gap: '10px' }}>
          <img src={artSrc} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div className='song-title'>{title}</div>
            <div className='artist-name'>{artist}</div>
          </div>
        </div>
        <MainControls
          handleClickPlay={handleClickPlay}
          videoId={videoId}
          repeat={repeat}
          setRepeat={setRepeat}
          player={player}
          currTime={currTime}
          maxTime={maxTime}
          status={status}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '300px'
          }}
        >
          <VolumeSlider player={player} volume={volume} setVolume={setVolume} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '60px'
            }}
          >
            Plays {plays}
          </div>
        </div>
      </div>
    </>
  );
}
