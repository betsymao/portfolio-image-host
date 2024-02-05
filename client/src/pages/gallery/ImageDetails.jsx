// libraries
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// services
import uploadService from '../../services/uploadService';

// hooks
import useAuth from '../../hooks/useAuth';

function ImageDetails() {

  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [uploadData, setuploadData] = useState({
    title: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id, title, category, image } = uploadData;

  const effectRan = useRef(false);
  useEffect(() => {
    console.log("Effect Ran");
    if (effectRan.current === false) {
      fetchUpload ();
      setLoading(false);

      return () => {
        console.log('Unmounted.');
        effectRan.current = true;
      }
    }
  }, [id]);

  async function fetchUpload() {
    try {
      const response = await uploadService.getById(id);
      const fetchedUpload = await response.data
      console.log(fetchedUpload);

      setUploadData(uploadOnMount => ({...uploadOnMount,...fetchedUpload}));

    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await uploadService.del(id);
      console.log(response);

      setLoading(false);
      navigate('/');
      
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
  }

  if (error) {
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
      {/* individual image page with details */}
      {/* title */}
      <img src={image} alt={title} />

      {user && 
      <div>
        <Link to={`/images/edit/${id}`}>Edit</Link>
        <button onClick={handleDelete}>
          {loading ? '...' : 'Delete'}
        </button>
      </div>}
    </>
  );
}

export default ImageDetails;
  