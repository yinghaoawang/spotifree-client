import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Root.css';
import MediaTray from './components/MediaTray';

export default function Root() {
  return (
    <div id='main'>
      <Navbar />
      <div id='detail'>
        <Outlet />
      </div>
      <MediaTray />
    </div>
  );
}
