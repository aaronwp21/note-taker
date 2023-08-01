import Image from 'next/image';
import Layout from '@/components/Layout';
import NoteList from '@/components/NoteList';
import { Tag } from '@/types';

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

export default function Home({
  availableTags,
  updateTag,
  deleteTag,
  notes,
}: NoteListProps) {
  return (
    <Layout>
      <NoteList
        availableTags={availableTags}
        notes={notes}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </Layout>
  );
}
