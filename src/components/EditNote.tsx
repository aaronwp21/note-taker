import React from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import EditNoteForm from './EditNoteForm';
import { Note, NoteData, Tag } from '@/types';

type EditNoteProps = {
  onSubmit: (user: UserProfile, id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  note: any
};

function EditNote({ onSubmit, onAddTag, availableTags, note }: EditNoteProps) {
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <EditNoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        id={note.id}
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditNote;
