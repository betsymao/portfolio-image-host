// libraries
import { Link } from 'react-router-dom';

function Footer({ date }) {
  return (
    <>
      <footer className="root__content--margin">
          <div className="footer--container">
              <p className="footer__body">
                  &copy; {date} Clik.
                  Example project by <Link to="/" className="footer__link">Betsy</Link>.
              </p>
          </div>
      </footer>
    </>
  );
}

export default Footer;