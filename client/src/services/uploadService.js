import api from './api';

function getAll() {
  return api.get('/api/images');
}

function post(data) {
  const formData = prepareFormData(data);
  return api.post(
    '/api/images', 
    formData,
    formConfig,
  );
}

function getById(id) {
  return api.get('/api/images/' + id);
}

function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile);
  return api.put(
    '/api/images/' + id, 
    formData, 
    formConfig,
  );
}

function del(id) {
  return api.delete('/api/images/' + id);
}


const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

function prepareFormData(data, uploadedfile) {
  let formData = new FormData();

  formData.append('title', data.title);
  formData.append('category', data.category);
  formData.append('description', data.description);
  formData.append('image', data.image);

  if (uploadedfile) {
    formData.append('uploadedFile', uploadedfile);
  }
  
  return formData;
}

const uploadService = {
  getAll,
  post,
  getById,
  put,
  del,
}

export default uploadService;