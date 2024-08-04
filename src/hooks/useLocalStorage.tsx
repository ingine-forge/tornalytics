import { useEffect, useState } from "react";

export function useLocalStorage<T>(keyName: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("Error reading localStorage", err);
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(storedValue));
  }, [keyName, storedValue]);

  const setValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(storedValue) : newValue;
      setStoredValue(valueToStore);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue] as const;
}
