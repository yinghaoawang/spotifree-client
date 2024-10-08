import { useState, useEffect } from 'react';

const usePersistedState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue == 'undefined') return undefined;
    if (storedValue == 'null') return null;
    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (err) {
      console.error(err);
      return storedValue || initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
