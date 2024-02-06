// libraries
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// services
import uploadService from '../../services/uploadService';

// hooks
import useAuth from '../../hooks/useAuth';

function ImageDetails() {

  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [uploadData, setUploadData] = useState({
    id: params.id,
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

  if (error) {
    return (
      <p>{error} Error</p>
    );
  }

  if (loading) {
    return (
      <p>...</p>
    );
  }

  return (
    <>
      <div className="root__content--justify root__content--align root__content--margin">
        <div className="content--flex">
          <p className="image__subtitle">{title}</p>
          <p className="image__category">Category: {category}</p>
        </div>
        <img src={image} alt={title} className="image__upload" />
      </div>
    </>
  );
}

export default ImageDetails;