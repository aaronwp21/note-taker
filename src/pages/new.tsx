import Layout from '@/components/Layout';
import NewNote from '@/components/NewNote';

export default function New({onCreateNote}: any) {
  return (
    <Layout>
      <NewNote onSubmit={onCreateNote} />
    </Layout>
  );
}
