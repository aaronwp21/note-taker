import { UserProfile } from "@auth0/nextjs-auth0/client"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type NewNoteProps = {
  onSubmit: (user:UserProfile, data: NoteData) => void
  onAddTag: (user: UserProfile | undefined, tag: Tag) => void
  availableTags: Tag[]
}