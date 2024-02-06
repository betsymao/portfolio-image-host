// libraries
import { 
  Routes, 
  Route
} from 'react-router-dom'

// components
import Layout from './components/layout/Layout';
import PrivateRoutes from './components/layout/PrivateRoutes';

// pages
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AddImage from './pages/gallery/AddImage';
import ImageDetails from './pages/gallery/ImageDetails';

function App() {
  return (
    <>
      <Routes>
        {/* layout component */}
        <Route path='/' element={<Layout />}>

          {/* home page */}
          <Route index element={<Home />} />

          {/* account pages */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* gallery pages */}
          <Route path='/image/:id' element={<ImageDetails />} />
            {/* protected gallery pages */}
            <Route element={<PrivateRoutes />}>
              <Route path='/upload' element={<AddImage />} />
            </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;