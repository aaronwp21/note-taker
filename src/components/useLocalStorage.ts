import { useEffect, useState } from 'react';
import { DashboardContext } from './contexts/dashboard.context';
import { useUser } from '@auth0/nextjs-auth0/client';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const { user } = useUser();
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const dbValue = localStorage.getItem(key);
      if (dbValue == null) {
        if (typeof initialValue === 'function') {
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(dbValue);
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
      if (user) {
        fetch(`/api/dashboard/${user.sub}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setValue(data[key]);
          });
      }
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [user, key]);

  return [value, setValue] as [T, typeof setValue];
}
