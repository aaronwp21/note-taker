import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import NoteLayout from '@/components/NoteLayout';
import { Note } from '@/types';
import { useState } from 'react';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import { DashboardContext } from '@/components/contexts/dashboard.context';


export default function Page() {
  const router = useRouter();
  const [currentNote, setCurrentNote] = useState<Note | undefined | null>(null);

  const { notes, onDelete } = useContext(DashboardContext);

  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router])

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{currentNote ? currentNote.title : 'Note'}</title>
      </Head>
      <NoteLayout notes={notes} setCurrentNote={setCurrentNote}>
        <Row className="align-items-center mb-4">
          <Col>
            <h1>{currentNote ? currentNote.title : ''}</h1>
            {currentNote
              ? currentNote?.tags.length > 0 && (
                  <Stack gap={1} direction="horizontal" className="flex-wrap">
                    {currentNote.tags.map((tag) => (
                      <Badge className="text-truncate" key={tag.id}>
                        {tag.label}
                      </Badge>
                    ))}
                  </Stack>
                )
              : ''}
          </Col>
          <Col xs="auto">
            <Stack gap={2} direction="horizontal">
              <Link href={`/${currentNote?.id}/edit`}>
                <Button variant="primary">Edit</Button>
              </Link>
              <Button onClick={() => {
                onDelete(user, currentNote ? currentNote?.id : '')
                router.push('/')
                }} variant="outline-danger">Delete</Button>
              <Link href={'/'}>
                <Button variant="outline-secondary">Back</Button>
              </Link>
            </Stack>
          </Col>
        </Row>
        <ReactMarkdown>{currentNote ? currentNote?.markdown : ''}</ReactMarkdown>
      </NoteLayout>
    </>
  );
}
