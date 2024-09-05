import axios from 'axios';

const API_URL = 'http://localhost:8000/api/card';

export const fetchCards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addCard = async (cardData: any) => {
  const response = await axios.post(API_URL, cardData);
  return response.data;
};

export const updateCard = async (cardId: number, cardData: any) => {
  const response = await axios.put(`${API_URL}/${cardId}`, cardData);
  return response.data;
};

export const deleteCard = async (cardId: number) => {
  const response = await axios.delete(`${API_URL}/${cardId}`);
  return response.data;
};
