import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext';
import { SongContext } from '../contexts/SongContext';
import { UserContext } from '../contexts/UserContext';
import useFetch from '../hooks/useFetch';

const getDataFromSearchItem = (searchItem) => {
  const artSrc = searchItem.snippet.thumbnails.default.url;
  const { title, channelTitle } = searchItem.snippet;
  const { videoId } = searchItem.id;

  return { title, channelTitle, artSrc, videoId };
};

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams] = useSearchParams();
  const { setVideoId } = useContext(PlayerContext);
  const { token } = useContext(UserContext);
  const fetch = useFetch();
  const {
    setTitle,
    setArtist,
    setArtSrc,
    setVideoId: setSongVideoId,
    setPlays
  } = useContext(SongContext);

  useEffect(() => {
    const sq = searchParams.get('q');
    if (sq != null) {
      setSearchQuery(sq);
    }
  }, []);

  useEffect(() => {
    const searchEl = document.getElementById('search');
    searchEl.focus();
  }, []);

  const navigate = useNavigate();

  const search = async () => {
    navigate(`/search?q=${searchQuery}`);
    setIsSearching(true);

    const searchRes = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/search/${searchQuery}`
    );
    const searchJson = await searchRes.json();
    setSearchResults(searchJson.data);
    setIsSearching(false);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    search();
  };

  const handleClickSearchResult = async (searchItem) => {
    const { videoId, artSrc, title, channelTitle } =
      getDataFromSearchItem(searchItem);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    setVideoId(videoId);
    setSongVideoId(videoId);
    setArtSrc(artSrc);
    setTitle(title);
    setArtist(channelTitle);

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
  };

  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <input
          id='search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isSearching}
        />
        <button disabled={isSearching}>Search</button>
      </form>
      {searchResults?.items?.length > 0 && (
        <>
          <div>{searchResults.pageInfo.totalResults} results found</div>
          <div>
            {searchResults.items.map((searchItem, index) => (
              <div
                key={index}
                style={{ display: 'flex', cursor: 'pointer' }}
                onClick={() => handleClickSearchResult(searchItem)}
              >
                <img src={getDataFromSearchItem(searchItem).artSrc} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '10px'
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    {getDataFromSearchItem(searchItem).title}
                  </h3>
                  <div>{getDataFromSearchItem(searchItem).channelTitle}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {searchResults?.items?.length == 0 && <div>0 results found</div>}
      {searchResults == null && <div>please search for something</div>}
    </>
  );
}

export default Search;
