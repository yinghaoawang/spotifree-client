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

  const getDataFromRawSearchItem = (searchItem) => {
    const artSrc = searchItem.snippet.thumbnails.default.url;
    const { title, artist } = searchItem.snippet;
    const { videoId } = searchItem.id;

    return { title, artist, artSrc, videoId };
  };

  const getDataFromSearchItem = (searchItem) => {
    const artSrc = searchItem.album?.images?.[0]?.url;
    const artist =
      searchItem?.artists?.length > 1
        ? searchItem.artists.reduce(
            (acc, e, i) =>
              acc + e.name + (i != searchItem.artists.length - 1 ? ', ' : ''),
            ''
          )
        : searchItem?.artists?.[0]?.name || 'N/A';
    const { name: title } = searchItem;
    const videoId = 0;

    return { title, artist, artSrc, videoId };
  };

  const playVideoByIndex = async (videoId, artSrc, title, artist) => {
    const searchQuery = `${title} - ${artist}`;
    const searchRes = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/search/raw/${searchQuery}`
    );
    const searchJson = await searchRes.json();
    const rawVideoId = searchJson?.data?.items?.[videoId]?.id?.videoId;
    if (rawVideoId == null)
      alert(`Unable to video ID for ${title} - ${artist}.`);
    else playRawVideo(rawVideoId, artSrc, title, artist);
  };

  const playVideo = async (videoId, artSrc, title, artist) => {
    if (videoId == null || parseInt(videoId) < 1000) {
      playVideoByIndex(videoId, artSrc, title, artist);
    } else {
      console.log('vid', videoId);
      playRawVideo(videoId, artSrc, title, artist);
    }
  };

  const playRawVideo = async (videoId, artSrc, title, artist) => {
    console.log(videoId);
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

  const playSearchItem = async (searchItem, raw = true) => {
    const { videoId, artSrc, title, artist } = raw
      ? getDataFromRawSearchItem(searchItem)
      : getDataFromSearchItem(searchItem);

    playVideo(videoId, artSrc, title, artist);
  };

  return {
    playSearchItem,
    getDataFromRawSearchItem,
    getDataFromSearchItem,
    playRawVideo
  };
};

export default useVideo;
