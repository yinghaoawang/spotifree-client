import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [artSrc, setArtSrc] = useState(null);
  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [videoId, setVideoId] = useState(null);

  return (
    <SongContext.Provider
      value={{
        isLoading,
        setIsLoading,
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
