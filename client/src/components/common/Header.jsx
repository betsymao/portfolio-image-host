// libraries
import { Link } from 'react-router-dom';

// assets
import Logo from '../../assets/logo.svg';

function Header() {
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
                <li className="nav__list--item">
                <Link to="/register" className="nav__list--link">Register</Link>
                </li>
                <li className="nav__list--item">
                {/* <Button name={"Login"} /> */}
                <Link to="/login" className="nav__list--link">Login</Link>
                </li>

                {/* - User logged in */}
                {/* <p className="username">Hi Name!</p>
                <li className="nav__list--item">
                <Link to="/upload" className="nav__list--link">Upload</Link>
                </li> */}

              </ul>
            </nav>
          </div>
      </header>
    </>
  );
}

export default Header;
