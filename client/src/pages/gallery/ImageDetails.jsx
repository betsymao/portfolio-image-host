// libraries
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// services
import uploadService from '../../services/uploadService';

function ImageDetails() {

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
    if (effectRan.current === false) {
      fetchUpload ();
      setLoading(false);

      return () => {
        effectRan.current = true;
      }
    }
  }, [id]);

  async function fetchUpload() {
    try {
      const response = await uploadService.getById(id);
      const fetchedUpload = await response.data

      setUploadData(uploadOnMount => ({...uploadOnMount,...fetchedUpload}));

    } catch (err) {
      toast.error(`${err.response.data}`);
      setError(true);
    }
  }

  if (error) {
    return (
      <p>Error</p>
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