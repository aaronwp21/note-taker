import React, { useContext } from 'react';
import Layout from '@/components/Layout';
import NewNote from '@/components/NewNote';
import { DashboardContext } from '@/components/contexts/dashboard.context';

export default function New() {
  const { onCreateNote, onAddTag, availableTags } = useContext(DashboardContext)
  return (
    <Layout>
      <NewNote onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={availableTags} />
    </Layout>
  );
}
