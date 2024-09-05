import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const fetchCards = async () => {
  const response = await axios.get(`${baseUrl}/api/card/`);
  return response.data;
};

export const addCard = async (cardData: any) => {
  const response = await axios.post(`${baseUrl}/api/card/`, cardData);
  return response.data;
};

export const updateCard = async (cardId: number, cardData: any) => {
  const response = await axios.put(`${baseUrl}/api/card/${cardId}`, cardData);
  return response.data;
};

export const deleteCard = async (cardId: number) => {
  const response = await axios.delete(`${baseUrl}/api/card/${cardId}`);
  return response.data;
};
