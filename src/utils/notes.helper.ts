import { notesListSchema, noteSchema } from '../api/schemas/notes.schema';
import { z } from 'zod';
import { expect } from '@playwright/test';

type Note = z.infer<typeof noteSchema>;

export async function getRandomNote(notesApi: any): Promise<Note> {
    const response = await notesApi.getNotes();
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    const parsed = notesListSchema.safeParse(body);

    if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Schema validation failed');
    }

    if (parsed.data.length === 0) {
        throw new Error('No notes found');
    }

    const position = Math.floor(Math.random() * parsed.data.length);

    return parsed.data[position];
}