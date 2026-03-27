import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  completed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const notesListSchema = z.array(noteSchema);