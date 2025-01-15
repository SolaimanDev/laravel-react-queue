import { useState, useEffect } from 'react';

const FetchApi = (url) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // Start with null for flexibility

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);

      // Check if response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]); 

  return { isLoading, error, data };
};

export default FetchApi;