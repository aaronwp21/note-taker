import React from 'react';
import NoteForm from './NoteForm';
import { NewNoteProps } from '@/types';

function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
