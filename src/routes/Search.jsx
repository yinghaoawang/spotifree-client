import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PlayerContext, Statuses } from '../contexts/PlayerContext';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams] = useSearchParams();
  const { setVideoId, setStatus } = useContext(PlayerContext);

  useEffect(() => {
    const sq = searchParams.get('q');
    if (sq != null) {
      setSearchQuery(sq);
    }
  }, []);

  const navigate = useNavigate();

  const search = async () => {
    navigate(`/search?q=${searchQuery}`);
    setIsSearching(true);

    const searchRes = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/search/${searchQuery}`,
      {
        method: 'GET'
      }
    );
    const searchJson = await searchRes.json();
    setSearchResults(searchJson.data);
    setIsSearching(false);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    search();
  };

  const handleClickSearchResult = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(videoUrl);
    setVideoId(videoId);
  };

  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <input
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
                onClick={() => handleClickSearchResult(searchItem.id.videoId)}
              >
                <img src={searchItem.snippet.thumbnails.default.url} />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '10px'
                  }}
                >
                  <h3 style={{ margin: 0 }}>{searchItem.snippet.title}</h3>
                  <div>{searchItem.snippet.channelTitle}</div>
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
