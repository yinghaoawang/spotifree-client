import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id='sidebar' style={{ backgroundColor: 'black' }}>
      <ul>
        <li>
          <Link to={``}>Home</Link>
        </li>
        <li>
          <Link to={`contacts/1`}>Your Name</Link>
        </li>
        <li>
          <Link to={`search`}>Search</Link>
        </li>
      </ul>
    </nav>
  );
}
