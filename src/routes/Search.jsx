import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useVideo from '../hooks/useVideo';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams] = useSearchParams();

  const fetch = useFetch();
  const { getDataFromSearchItem, playSearchItem } = useVideo();

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
                onClick={() => playSearchItem(searchItem)}
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
