import axios from 'axios';
import { useHistory } from 'react-router-dom';

const https = axios.create({
  baseURL: 'https://example.com/api',
});

class SubjectService {
  constructor() {
    this.history = useHistory();
  }

  getAllSubjects(classId) {
    return https.get(`/class/${classId}/subjects`)
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }

  getSubjectById(id) {
    return https.get(`/subjects/${id}`)
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }

  createSubject(classId, body) {
    return https.post(`/class/${classId}/subjects`, body)
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }

  updateSubject(id, body) {
    return https.put(`/subjects/${id}`, body)
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }

  deleteSubject(id) {
    return https.delete(`/subjects/${id}`)
      .then(response => response.data)
      .catch(error => {
        this.history.push('/error', { error });
      });
  }
}

export const subjectService = new SubjectService();
