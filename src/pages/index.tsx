import { useContext } from 'react';
import Head from 'next/head';
import { DashboardContext } from '@/components/contexts/dashboard.context';
import { UserProfile } from '@auth0/nextjs-auth0/client';
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
  deleteTag: (user: UserProfile | undefined, id: string) => void;
  updateTag: (user: UserProfile | undefined, id: string, label: string) => void;
};

export default function Home() {
  const { availableTags, notes, updateTag, deleteTag } = useContext(DashboardContext)

  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>
      <Layout>
        <NoteList
          availableTags={availableTags}
          notes={notes}
          updateTag={updateTag}
          deleteTag={deleteTag}
        />
      </Layout>
    </>
  );
}
