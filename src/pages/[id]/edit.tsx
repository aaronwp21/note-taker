import React, { useState, useContext } from 'react';
import { DashboardContext } from '@/components/contexts/dashboard.context';
import Layout from '@/components/Layout';
import NoteLayout from '@/components/NoteLayout';
import { Note } from '@/types';
import EditNote from '@/components/EditNote';
import Head from 'next/head';

type NoteLayoutProps = {
  notes: Note[];
};

export default function Edit() {
  const [currentNote, setCurrentNote] = useState<Note | undefined | null>(null);

  const { notes, onUpdateNote, onAddTag, availableTags } = useContext(DashboardContext)

  return (
    <>
      <Head>
        <title>Edit Note</title>
      </Head>
      <Layout>
        <NoteLayout notes={notes} setCurrentNote={setCurrentNote}>
          {currentNote ? <EditNote
            onSubmit={onUpdateNote}
            onAddTag={onAddTag}
            availableTags={availableTags}
            note={currentNote}
          /> : ''}
        </NoteLayout>
      </Layout>
    </>
  );
}
