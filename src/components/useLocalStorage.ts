import { useEffect, useState } from 'react';
import { DashboardContext } from './contexts/dashboard.context';
import { useUser } from '@auth0/nextjs-auth0/client';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const { user } = useUser();
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue == null) {
        if (typeof initialValue === 'function') {
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(jsonValue);
      }
    } else {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        fetch(`/api/dashboard/${user.sub}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setValue(data[key]);
          });
      }
    }
  }, [user, key]);

  return [value, setValue] as [T, typeof setValue];
}
