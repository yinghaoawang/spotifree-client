import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlayerContext = createContext();

export const Statuses = Object.freeze({
  UNSTARTED: -1,
  STOPPED: 0,
  PLAYING: 1,
  PAUSED: 2
});

export const PlayerProvider = ({ children }) => {
  const [videoId, setVideoId] = useState('');
  const [status, setStatus] = useState(Statuses.UNSTARTED);
  const [player, setPlayer] = useState();

  return (
    <PlayerContext.Provider
      value={{
        videoId,
        setVideoId,
        status,
        setStatus,
        player,
        setPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired
};
