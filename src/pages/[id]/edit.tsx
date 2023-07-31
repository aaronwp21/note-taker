import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NoteLayout from '@/components/NoteLayout';
import { Note } from '@/types';

type NoteLayoutProps = {
  notes: Note[];
};

export default function Edit({ notes }: NoteLayoutProps) {
  const [currentNote, setCurrentNote] = useState<Note | undefined | null>(null);

  return (
    <Layout>
      <NoteLayout notes={notes} setCurrentNote={setCurrentNote}>
        <h1>Id edit</h1>
      </NoteLayout>
    </Layout>
  );
}
