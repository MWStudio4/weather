import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.REACT_APP_REST_API_URL;
const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const iosHeaders = {
  'Cache-Control': 'no-cache',
};

const baseAuthHeaders = () => ({
  headers: {
    ...baseHeaders,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const resultStructure = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export {
  baseUrl, baseHeaders, iosHeaders, baseAuthHeaders, resultStructure,
};
