import React from 'react';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DashboardProvider } from '@/components/contexts/dashboard.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <DashboardProvider>
        <Component
          {...pageProps}
        />
      </DashboardProvider>
    </UserProvider>
  );
}
