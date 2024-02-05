// libraries
import { Outlet} from 'react-router-dom';

// components
import Header from '../common/Header';
import Footer from '../common/Footer';

function Layout() {
  return (
    <>
      <div className="root__container">
        <Header />
        <Outlet />
        <Footer date={new Date().getFullYear()} />
      </div>
    </>
  );
}

export default Layout;