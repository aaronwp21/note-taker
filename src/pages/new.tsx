import Layout from '@/components/Layout';
import NewNote from '@/components/NewNote';

export default function New({onCreateNote, onAddTag, availableTags}: any) {
  return (
    <Layout>
      <NewNote onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={availableTags} />
    </Layout>
  );
}
