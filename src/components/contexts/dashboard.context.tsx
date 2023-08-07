import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { NextComponentType, NextPageContext } from 'next';
import type { UserProfile } from '@auth0/nextjs-auth0/client';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../useLocalStorage';
import { Note, NoteData, RawNote, Tag } from '@/types';

type DashboardContextProps = {
  fetchDashboard: (user: UserProfile) => Promise<void> | [];
  onCreateNote: (user: UserProfile, { tags, ...data }: NoteData) => void;
  onUpdateNote: (
    user: UserProfile,
    id: string,
    { tags, ...data }: NoteData,
  ) => void;
  onDelete: (user: UserProfile | undefined, id: string) => void;
  onAddTag: (tag: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  notes: Note[];
  availableTags: Tag[];
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
  availableTags: [],
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

  const fetchDashboard = useCallback(
    async (user: UserProfile) => {
      try {
        const response = await fetch(`/api/dashboard/${user.sub}`);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setNotes(data['NOTES']);
        setTags(data['TAGS']);
      } catch (err) {
        console.log(err);
      }
    },
    [setNotes, setTags],
  );

  const onCreateNote = useCallback(
    async (user: UserProfile, { tags, ...data }: NoteData) => {
      try {
        const id = uuidV4();
        const response = await fetch(`/api/notes/${user.sub}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notesArr: [
              ...notes,
              { ...data, id: id, tagIds: tags.map((tag) => tag.id) },
            ],
          }),
        });
        if (!response.ok) {
          throw response;
        }
        const res = await response.json();
        console.log(res);
        setNotes((prevNotes) => {
          return [
            ...prevNotes,
            { ...data, id: id, tagIds: tags.map((tag) => tag.id) },
          ];
        });
      } catch (err) {
        console.log(err);
      }
    },
    [setNotes, notes],
  );

  const onUpdateNote = useCallback(
    async (user: UserProfile, id: string, { tags, ...data }: NoteData) => {
      try {
        const editedNote = notes.map((note) => {
          if (note.id === id) {
            return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
          } else {
            return note;
          }
        });
        const response = await fetch(`/api/notes/${user.sub}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notesArr: editedNote,
          }),
        });
        if (!response.ok) {
          throw response;
        }
        const res = await response.json();
        console.log(res);
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note.id === id) {
              return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
            } else {
              return note;
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    [notes, setNotes],
  );

  const onDeleteNote = useCallback(
    async (user: UserProfile | undefined, id: string) => {
      try {
        if (user) {
          const deletedNote = notes.filter((note) => note.id !== id);
          const response = await fetch(`/api/notes/${user.sub}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              notesArr: deletedNote,
            }),
          });
          if (!response.ok) {
            throw response;
          }
          const res = await response.json();
          console.log(res);
          setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [notes, setNotes],
  );

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
