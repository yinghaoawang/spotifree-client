import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function Root() {
  const [recentVideos, setRecentVideos] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const fetch = useFetch();

  useEffect(() => {
    const fetchRecentVideos = async () => {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/recent`);
      const json = await res.json();
      console.log(json.recent);
      setRecentVideos([...json.recent]);
    };
    fetchRecentVideos();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/leaderboard`
      );
      const json = await res.json();
      console.log(json.recent);
      setTopUsers([...json.top_users]);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className='home-page'>
      <div className='banner'>
        <img src='banner.png' alt='Music Banner' className='banner-image' />
        <div className='banner-text'>
          <h1>Welcome to Spotifree</h1>
          <p>Discover and enjoy your favorite tunes!</p>
        </div>
      </div>
      <div className='content'>
        {/* <section className='trending-songs'>
          <h2>Trending Songs</h2>
        </section> */}
        <section className='recently-played'>
          <h2>Popular This Week</h2>
          {recentVideos && recentVideos.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', overflow: 'auto' }}>
              {recentVideos.map((recentVideo) => {
                return (
                  <div
                    key={recentVideo.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '150px'
                    }}
                  >
                    <img style={{ width: '150px' }} src={recentVideo.art_src} />
                    <div>
                      <div className='text-ellipsis song-title'>
                        {recentVideo.title}
                      </div>
                      <div className='text-ellipsis artist-name'>
                        {recentVideo.artist_name}
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        Played {recentVideo.play_count} times
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <section className='leaderboard'>
          <h2>Top Users This Week</h2>
          {recentVideos && recentVideos.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', overflow: 'auto' }}>
              {topUsers.map((topUser) => {
                return (
                  <div
                    key={topUser.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '150px'
                    }}
                  >
                    <img
                      style={{ width: '120px', borderRadius: '120px', marginBottom: '5px' }}
                      src={`https://randomuser.me/api/portraits/lego/${
                        topUser.id % 9
                      }.jpg`}
                    />
                    <div>
                      <div className='text-ellipsis song-title'>
                        {topUser.username}
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        Played {topUser.play_count} songs
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Root;
