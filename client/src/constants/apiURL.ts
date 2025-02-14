export const BASE_URL = 'http://localhost:3000';

export const CREATE_ADVERTISEMENT = `${BASE_URL}/items`;
export const GET_ADVERTISEMENTS = `${BASE_URL}/items`;
export const GET_ADVERTISEMENT = (id: string) => `${BASE_URL}/items/${id}`;
