import { API_URL } from '../../constants/endpoints';
import { BaseAPI } from './base.api';

export class NotesAPI extends BaseAPI {
  async createNote(payload: any) {
    return await this.request.post(`${API_URL}/notes`, { data: payload });
  }

  async getNotes() {
    return await this.request.get(`${API_URL}/notes`);
  }

  async getNoteById(id: string) {
    return await this.request.get(`${API_URL}/notes/${id}`);
  }

  async deleteNote(id: string) {
    return await this.request.delete(`${API_URL}/notes/${id}`);
  }

  async editNote(id: string) {
    return await this.request.put(`${API_URL}/notes/${id}`);
  }
}