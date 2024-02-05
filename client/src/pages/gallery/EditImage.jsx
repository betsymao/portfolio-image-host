// libraries
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// services
import uploadService from '../../services/uploadService';

// utilities
import { getFileFromUrl } from '../../utilities/writeUtilities';

function EditImage() {

  const params = useParams();
  const navigate = useNavigate();

  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [uploadedFile, setUploadedFile] = useState('');
  const [preview, setPreview] = useState(true);

  const { id, title, category, image } = uploadData;

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      fetchUpload();
      setLoading(false);

      return () => {
        effectRan.current = true;
      }
    }
  }, [id]);

  async function fetchUpload() {
    try {
      const response = await uploadService.getById(id);
      const dbUpload = await response.data;
      console.log(dbUpload);

      setUploadData(uploadData => ({ ...uploadData, ...dbUpload }));

      if (!dbUpload.image) {      
        console.log('No downloadURL provided by DB.'); 
      } else {
        const fileGlob = getFileFromUrl(dbUpload.image);
        setUploadedFile(fileGlob);
      }

    } catch(err) {
      console.log(err?.response);
      setError(true); 
    }
  }

  const handleTextChange = (e) => {
    const { title, value } = e.target;
    setUploadyData({ ...uploadData, title: value });
  };

  const handleCategoryChange = (e) => {
    const { category, value } = e.target;
    setUploadData({ ...uploadData, category: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadData({ ...uploadData, image: file });
    setPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);

    try {

      const response = await uploadService.put(id, uploadData, uploadedFile);
      console.log(response);
      navigate('/');

    } catch (err) {
      console.log(err?.response);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {setLoading(false)}, 1000);
    }
  };

  // if (error) {
  //   return (
  //       <p>Error.</p>
  //   );
  // }

  if (loading) {
    return (
      <p>...</p>
    );
  }

  return (
    <>
      <div className="root__content--justify root__content--align">

        <div className="card">
        
          {/* header */}
          <div className="card__header">
            <h2 className="card__title">Edit an image</h2>
            <p className="card__text">File extensions allowed:</p>
            <ul className="card__list">
              <li className="card__list--item">.png</li>
              <li className="card__list--item">.jpg</li>
              <li className="card__list--item">.jpeg</li>
            </ul>
          </div>

          {/* form document */}
          <form className="card__form" onSubmit={ handleSubmit }>

              {/* title */}
              <div className="formGroup">
                <label className="formLabel">
                  Title:
                </label>
                <input 
                className="formInput"
                type="text" 
                placeholder=" e.g. Cat in a box"
                name="title"
                value={title}
                onChange={ handleTextChange }
                required />
              </div>

              {/* category */}
              <div className="formGroup">
                <label className="formLabel">
                  Category:
                </label>
                <select 
                className="formInput"
                name="category"
                value={category}
                onChange={ handleCategoryChange }>
                  <option value="">--Please choose a category--</option>
                  <option value="animals">Animals</option>
                  <option value="nature">Nature</option>
                  <option value="food">Food</option>
                  <option value="city">City</option>
                  <option value="people">People</option>
                  <option value="other">Other</option>
                </select>
              </div>

              { preview && !loading ? 
              <div>
                <img src={image} alt="preview"/>
              </div> : null }

              {/* file */}
              <div className="formGroup">
                  <label className="formLabel">
                    File:
                  </label>
                  <input 
                  type="file" 
                  onChange={ handleFileChange }
                  required />
              </div>

              <button className="formBtn">
                { loading ? '...' : 'Edit'}
              </button>

          </form>
        </div>
      </div>
    </>
  );
}
  
export default EditImage;