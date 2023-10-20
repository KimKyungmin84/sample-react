import { useState, useEffect } from 'react';

function useErrorHandling() {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { setError };
}

export default useErrorHandling;