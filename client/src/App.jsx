// libraries
import { 
  Routes, 
  Route
} from 'react-router-dom'

// components
import Layout from './components/layout/Layout';

// pages
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AddImage from './pages/gallery/AddImage';
import EditImage from './pages/gallery/EditImage';
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
          <Route path='/upload' element={<AddImage />} />
          <Route path='/edit/:id' element={<EditImage />} />
          <Route path='/image/:id' element={<ImageDetails />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;