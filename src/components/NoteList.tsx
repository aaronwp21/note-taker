import React from 'react'
import Link from 'next/link'
import { Row, Col, Stack, Button, Form } from 'react-bootstrap'
import ReactSelect from 'react-select'

function NoteList() {
  return (
    <>
      <Row>
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction='horizontal'>
            <Link href={'/new'}>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              {/* <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    }),
                  );
                }}
                isMulti
              /> */}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default NoteList