import Image from 'next/image';
import Layout from '@/components/Layout';
import NoteList from '@/components/NoteList';
import { Tag } from '@/types';

export default function Home({ availableTags, notes }: any) {
  return (
    <Layout>
      <NoteList availableTags={availableTags} notes={notes} />
    </Layout>
  );
}
