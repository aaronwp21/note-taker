import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Layout from '@/components/Layout';
import NewNote from '@/components/NewNote';
import { DashboardContext } from '@/components/contexts/dashboard.context';

export default function New() {
  const router = useRouter();
  const { onCreateNote, onAddTag, availableTags } =
    useContext(DashboardContext);

  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>New Note</title>
      </Head>
      <Layout>
        <NewNote
          onSubmit={onCreateNote}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      </Layout>
    </>
  );
}
