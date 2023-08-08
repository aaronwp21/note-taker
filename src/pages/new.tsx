import React, { useContext } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import NewNote from '@/components/NewNote';
import { DashboardContext } from '@/components/contexts/dashboard.context';


export default function New() {
  const { onCreateNote, onAddTag, availableTags } =
    useContext(DashboardContext);
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
