import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NoteLayout from '@/components/NoteLayout';
import { Note } from '@/types';
import { useState } from 'react';
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'

type NoteLayoutProps = {
  notes: Note[];
  onDelete: (id: string) => void
};

export default function Page({ notes, onDelete }: NoteLayoutProps) {
  const router = useRouter();
  const [currentNote, setCurrentNote] = useState<Note | undefined | null>(null);

  return (
    <>
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
                onDelete(currentNote ? currentNote?.id : '')
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
