import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable"
import { Note, NoteData, Tag } from "./App";
import { v4 as uuidV4 } from 'uuid'
import { Prev } from "react-bootstrap/esm/PageItem";
import { getTags } from "./GetTags";


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ 
    onSubmit,
    onAddTag,
    availableTags, 
    title = "" ,
    markdown="",
    tags=[],
}: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSetectetTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })

        navigate("..")
    }

    return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} required defaultValue={title}/>

                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect 
                    onCreateOption={label => {
                        const newTag = {id: uuidV4(), label }
                        onAddTag(newTag)
                        setSetectetTags(prev => [...prev, newTag])
                    }}
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                    })} 
                    options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })}
                    onChange={tags => {
                        setSetectetTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value }
                        })) 
                    }}
                    
                    isMulti />

                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control 
                defaultValue={markdown} 
                required 
                as="textarea" 
                ref={markdownRef} 
                // onChange={getTags}
                rows={15} />

            </Form.Group>
            <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                    Cancel
              </Button>
            </Link>
                <Button type="submit" variant="primary">
                    Save
                </Button>
            </Stack>
        </Stack>
    </Form>
    )
}