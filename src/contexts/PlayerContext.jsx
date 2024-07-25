import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from '../hooks/usePersistedState';

export const PlayerContext = createContext();

export const opts = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1
  }
};

export const Statuses = Object.freeze({
  UNSTARTED: -1,
  STOPPED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5
});

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState();
  const [status, setStatus] = useState(Statuses.UNSTARTED);
  const [videoId, setVideoId] = usePersistedState('videoId', '');
  const [repeat, setRepeat] = usePersistedState('repeat', false);
  const [volume, setVolume] = usePersistedState('volume', 20);

  return (
    <PlayerContext.Provider
      value={{
        videoId,
        setVideoId,
        status,
        setStatus,
        player,
        setPlayer,
        volume,
        setVolume,
        repeat,
        setRepeat
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired
};
