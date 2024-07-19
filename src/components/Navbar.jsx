import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id='sidebar'>
      <ul>
        <li>
          <Link to={``}>Home</Link>
        </li>
        <li>
          <Link to={`contacts/1`}>Your Name</Link>
        </li>
        <li>
          <Link to={`contacts/2`}>Your Friend</Link>
        </li>
      </ul>
    </nav>
  );
}
