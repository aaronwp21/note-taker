import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import type { UserProfile } from '@auth0/nextjs-auth0/client';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../useLocalStorage';
import { Note, NoteData, RawNote, Tag } from '@/types';

type DashboardContextProps = {
  fetchDashboard: (user: UserProfile) => Promise<void> | [];
  onCreateNote: ({ tags, ...data }: NoteData) => void;
  onUpdateNote: (id: string, { tags, ...data }: NoteData) => void;
  onDelete: (id: string) => void;
  onAddTag: (tag: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  notes: Note[],
  availableTags: Tag[]
};

export const DashboardContext = createContext<DashboardContextProps>({
  fetchDashboard: () => [],
  onCreateNote: () => [],
  onUpdateNote: () => [],
  onDelete: () => [],
  onAddTag: () => [],
  updateTag: () => [],
  deleteTag: () => [],
  notes: [],
  availableTags: []
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
  }, [setNotes, setTags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <DashboardContext.Provider
      value={{
        fetchDashboard,
        onCreateNote,
        onUpdateNote,
        onDelete: onDeleteNote,
        onAddTag: addTag,
        updateTag,
        deleteTag,
        notes: notesWithTags,
        availableTags: tags,
      }}>
      {children}
    </DashboardContext.Provider>
  )
}