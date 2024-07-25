import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from '../hooks/usePersistedState';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [artSrc, setArtSrc] = usePersistedState('artSrc', null);
  const [title, setTitle] = usePersistedState('title', null);
  const [artist, setArtist] = usePersistedState('artist', null);
  const [videoId, setVideoId] = usePersistedState('songVideoId', null);

  return (
    <SongContext.Provider
      value={{
        artSrc,
        setArtSrc,
        title,
        setTitle,
        artist,
        setArtist,
        videoId,
        setVideoId
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

SongProvider.propTypes = {
  children: PropTypes.node.isRequired
};
