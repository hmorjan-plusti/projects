import api from './api';

export const uploadDataset = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/dataset/upload", formData);
};

export const getDatasets = () => {
  return api.get("/dataset");
};
