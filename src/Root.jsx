import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Root.css';
import PlayerTray from './components/PlayerTray';
import Player from './components/Player';

export default function Root() {
  return (
    <div id='main'>
      <Navbar />
      <div id='detail'>
        <Player />
        <Outlet />
      </div>
      <PlayerTray />
    </div>
  );
}
