// libraries
import { Link } from 'react-router-dom';

// hooks
import useAuth from '../../hooks/useAuth';

// assets
import Logo from '../../assets/logo.svg';

function Header() {

  const { user, logout } = useAuth();

  return (
    <>
        <header>
          <div className="header--container">
            {/* i. Logo */}
            <div className="logo">
            <Link to="/">
                <img src={Logo} />
            </Link>
            </div>

            {/* iii. Navigation */}
            <nav className="nav">
              <ul className="nav__list">

                {/* - User not logged in */}
                {!user && 
                <>
                  <li className="nav__list--item">
                  <Link to="/register" className="nav__list--link">Register</Link>
                  </li>
                  <li className="nav__list--item">
                  <Link to="/login" className="nav__list--link">Login</Link>
                  </li>
                </>}

                {/* - User logged in */}
                {user && 
                <>
                  <p className="username">Hi {user.username}!</p>
                  <li className="nav__list--item">
                  <Link to="/upload" className="nav__list--link">Upload</Link>
                  </li>
                </>}
              
                {user && <button className="headerBtn" onClick={() => { logout() }}>Logout</button>}

              </ul>
            </nav>
          </div>
      </header>
    </>
  );
}

export default Header;
