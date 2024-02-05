
// libraries
import { useState, useEffect, useRef } from 'react';

// services
import uploadService from '../services/uploadService';

// components
import ImageList from '../components/gallery/ImageList';

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const effectRan = useRef(false);
  useEffect(() => {
    console.log('Effect ran.');
    if (effectRan.current === false) {
      fetchUploads();
      setLoading(false);

      return () => {
        console.log('Unmounted.');
        effectRan.current = true;
      }
    }
  }, []);

  async function fetchUploads() {
    try {
      const response = await uploadService.getAll();

      const data = await response.data;

      console.log(data);
      setData(data);

    } catch(err) {
      console.log(err?.response);
      setError(true); 
    }
  }

  if (loading) {
    return (
      <p>Error.</p>
    );
  }

  if (loading) {
    return (
      <p>...</p>
    );
  }

  return (
    <>
      <ImageList uploads={data} />
    </>
  );
}

export default Home;
