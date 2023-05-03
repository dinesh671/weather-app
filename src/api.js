export const geoOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_X_RAPID_API_HOST,
  },
};
//console.log(import.meta.env.VITE_X_RAPID_API_KEY);