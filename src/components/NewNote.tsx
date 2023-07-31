import React from 'react';
import NoteForm from './NoteForm';
import { NewNoteProps } from '@/types';

function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  );
}

export default NewNote;
