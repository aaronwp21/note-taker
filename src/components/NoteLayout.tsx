import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Note } from '@/types';

type NoteLayoutProps = {
  notes: Note[];
  children: React.ReactNode;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | undefined | null>>;
};

function NoteLayout({ notes, children, setCurrentNote }: NoteLayoutProps) {
  const router = useRouter();

  const { id } = router.query;

  const note = notes.find((n) => n.id === id);

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  return <div className="m-4">{children}</div>;
}


export default NoteLayout;
