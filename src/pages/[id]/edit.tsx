import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NoteLayout from '@/components/NoteLayout';
import { Note } from '@/types';
import EditNote from '@/components/EditNote';

type NoteLayoutProps = {
  notes: Note[];
};

export default function Edit({
  notes,
  onUpdateNote,
  onAddTag,
  availableTags,
}: any) {
  const [currentNote, setCurrentNote] = useState<Note | undefined | null>(null);

  return (
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
  );
}
