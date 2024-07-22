import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Root.css';
import PlayerTray from './components/PlayerTray';

export default function Root() {
  return (
    <div id='main'>
      <Navbar />
      <div id='detail'>
        <Outlet />
      </div>
      <PlayerTray />
    </div>
  );
}
