import Image from 'next/image';
import Layout from '@/components/Layout';
import NoteList from '@/components/NoteList';
import { Tag } from '@/types';

type NoteListProps = {
  availableTags: Tag[]
}

export default function Home({ availableTags }: NoteListProps) {
  return (
    <Layout>
      <NoteList availableTags={availableTags} />
    </Layout>
  );
}
