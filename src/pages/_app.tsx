import React, { useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { NoteData, RawNote, Tag } from '@/types';
import { useLocalStorage } from '@/components/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

export default function App({ Component, pageProps }: AppProps) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }
  

  return (
    <Component
      {...pageProps}
      onCreateNote={onCreateNote}
      onAddTag={addTag}
      availableTags={tags}
      notes={notesWithTags}
    />
  );
}
