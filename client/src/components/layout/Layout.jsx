// libraries
import { Outlet} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

// components
import Header from '../common/Header';
import Footer from '../common/Footer';

function Layout() {
  return (
    <>
      <div className="root__container">
        <ToastContainer 
          style={{ textAlign: "center" }} 
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          transition={Slide}
          theme="colored"
        />
        <Header />
        <Outlet />
        <Footer date={new Date().getFullYear()} />
      </div>
    </>
  );
}

export default Layout;