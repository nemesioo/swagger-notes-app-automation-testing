import { BaseAPI } from './base.api';

export class NotesAPI extends BaseAPI {
  async createNote(payload: any) {
    return await this.request.post('/notes', { data: payload });
  }

  async getNotes() {
    return await this.request.get('/notes');
  }

  async getNoteById(id: string) {
    return await this.request.get(`/notes/${id}`);
  }

  async deleteNote(id: string) {
    return await this.request.delete(`/notes/${id}`);
  }
}