import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Kontrollera om det returnerade värdet är "undefined" som en sträng
      return item === "undefined" || item === null
        ? defaultValue
        : JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
