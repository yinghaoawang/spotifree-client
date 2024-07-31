import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  return (
    <nav id='navbar' style={{ backgroundColor: 'black' }}>
      <ul>
        <li>
          <Link to={``}>Home</Link>
        </li>
        <li>
          <Link to={`search`}>Search</Link>
        </li>
      </ul>
      <ul>
        {user ? (
          <>
            <li>Hello {user.username}</li>
            <li>
              <a
                href='#'
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={`login`}>Log In</Link>
            </li>
            <li>
              <Link to={`register`}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
