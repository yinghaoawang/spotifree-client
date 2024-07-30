import React, { createContext, useContext, useEffect, useState } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import UserContext from './UserContext';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [artSrc, setArtSrc] = usePersistedState('artSrc', null);
  const [title, setTitle] = usePersistedState('title', null);
  const [artist, setArtist] = usePersistedState('artist', null);
  const [videoId, setVideoId] = usePersistedState('songVideoId', null);
  const [plays, setPlays] = usePersistedState('plays', 0);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchPlays = async () => {
      if (videoId != null && token != null) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/user/get_plays`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ video_id: videoId })
            }
          );

          if (!response.ok) {
            throw new Error('Play count fetch failed');
          }

          const { playCount } = await response.json();
          setPlays(playCount);
        } catch (err) {
          console.error(err);
          setPlays(0);
        }
      } else {
        setPlays(0);
      }
    };
    fetchPlays();
  }, []);

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
        setVideoId,
        plays,
        setPlays
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
