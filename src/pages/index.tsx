import Image from 'next/image'
import Layout from '@/components/Layout'
import NoteList from '@/components/NoteList'

export default function Home() {
  return (
    <Layout>
      <NoteList />
    </Layout>
  )
}
