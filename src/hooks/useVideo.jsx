import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { SongContext } from '../contexts/SongContext';
import useFetch from './useFetch';

const useVideo = () => {
  const { setVideoId } = useContext(PlayerContext);
  const {
    setTitle,
    setArtist,
    setArtSrc,
    setVideoId: setSongVideoId,
    setPlays
  } = useContext(SongContext);
  const fetch = useFetch();

  const getDataFromSearchItem = (searchItem) => {
    const artSrc = searchItem.snippet.thumbnails.default.url;
    const { title, channelTitle } = searchItem.snippet;
    const { videoId } = searchItem.id;

    return { title, channelTitle, artSrc, videoId };
  };

  const playVideo = async (videoId, artSrc, title, artist) => {
    setVideoId(videoId);
    setSongVideoId(videoId);
    setArtSrc(artSrc);
    setTitle(title);
    setArtist(artist);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/user/get_plays`,
        {
          method: 'POST',
          body: JSON.stringify({ video_id: videoId })
        }
      );

      if (!response.ok) {
        throw new Error('Play count fetch failed');
      }

      const { playCount } = await response.json();
      setPlays(playCount);
      console.log(playCount);
    } catch (err) {
      console.error(err);
      setPlays(0);
    }
  };

  const playSearchItem = async (searchItem) => {
    const { videoId, artSrc, title, channelTitle } =
      getDataFromSearchItem(searchItem);

    playVideo(videoId, artSrc, title, channelTitle);
    // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  };

  return { playSearchItem, getDataFromSearchItem, playVideo };
};

export default useVideo;
