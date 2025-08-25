import api from './api';

export const trainModel = (data) => {
  return api.post("/ml/train", data);
};

export const predict = (input) => {
  return api.post("/ml/predict", input);
};
