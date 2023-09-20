import context from './context';

const retrieveNasaData = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/retrieve-nasa-data/`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then((error) => {
        throw new Error(error.message);
      });
    return res.json();
  });
};

export default retrieveNasaData;