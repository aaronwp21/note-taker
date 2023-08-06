import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import type { UserProfile } from '@auth0/nextjs-auth0/client';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../useLocalStorage';
import { Note, NoteData, RawNote, Tag } from '@/types';

type DashboardContextProps = {
  fetchDashboard: (user: UserProfile) => Promise<void> | [];
  onCreateNote: (userId:string, noteData:NoteData) => Promise<void> | [];
  notes: RawNote[],
  tags: Tag[]
};

export const DashboardContext = createContext<DashboardContextProps>({
  fetchDashboard: () => [],
  onCreateNote: () => [],
  // onUpdateNote: () => {},
  // onDeleteNote: () => [],
  // onAddTag: () => [],
  // onUpdateTag: () => {},
  // onDeleteTag: () => [],
  notes: [],
  tags: []
});

export const DashboardProvider = ({ children }: React.PropsWithChildren) => {
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

  const fetchDashboard = useCallback(async (user: UserProfile) => {
    try {
      const response = await fetch(`/api/dashboard/${user.sub}`);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setNotes(data['NOTES']);
      setTags(data['TAGS']);
    } catch (err) {
      console.log (err);
    }
  }, []);

  const onCreateNote = useCallback(async (userId:string, noteData:NoteData) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: userId, noteData: noteData}),
      })
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }, [])

  // function onCreateNote({ tags, ...data }: NoteData) {
  //   setNotes((prevNotes) => {
  //     return [
  //       ...prevNotes,
  //       { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
  //     ];
  //   });
  // }

  // function onUpdateNote(id: string, { tags, ...data }: NoteData) {
  //   setNotes((prevNotes) => {
  //     return prevNotes.map((note) => {
  //       if (note.id === id) {
  //         return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
  //       } else {
  //         return note;
  //       }
  //     });
  //   });
  // }

  // function onDeleteNote(id: string) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter(note => note.id !== id)
  //   })
  // }

  // function onAddTag(tag: Tag) {
  //   setTags((prevTags) => [...prevTags, tag]);
  // }

  // function onUpdateTag(id: string, label: string) {
  //   setTags(prevTags => {
  //     return prevTags.map(tag => {
  //       if (tag.id === id) {
  //         return { ...tag, label }
  //       } else {
  //         return tag
  //       }
  //     })
  //   })
  // }

  // function onDeleteTag(id: string) {
  //   setTags(prevTags => {
  //     return prevTags.filter(tag => tag.id !== id)
  //   })
  // }

  return (
    <DashboardContext.Provider
      value={{
        fetchDashboard,
        onCreateNote,
        notes,
        tags
      }}>
      {children}
    </DashboardContext.Provider>
  )
}