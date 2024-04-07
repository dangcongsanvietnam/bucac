import axios from 'axios';
import { useHistory } from 'react-router-dom';

const https = axios.create({
  baseURL: 'https://example.com/api',
});

class ClassService {
  constructor(history) {
    this.history = history;
  }

  getAllClass() {
    return https.get('/class')
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }

  getClassById(id) {
    return https.get(`/class/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  getClassByDepartment(id) {
    return https.get(`/classByDepartment/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  newClass(body) {
    return https.post("/class", body)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  updateClass(id, body) {
    return https.put(`/class/${id}`, body)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  deleteClass(id) {
    return https.delete(`/class/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}

// Export ClassService with history
export const classService = new ClassService(useHistory());
