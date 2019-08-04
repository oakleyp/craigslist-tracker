import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  uri = 'http://localhost:4000/tracker';

  constructor(private http: HttpClient) { }

  addTracker(tracker) {
    console.log('saving', {tracker});

    return this.http.post(`${this.uri}/add`, {tracker});
  }

  listTrackers() {
    return this.http.get(`${this.uri}`);
  }

  getTracker(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  updateTracker(id, tracker) {
    return this.http.post(`${this.uri}/update/${id}`, {tracker});
  }

  deleteTracker(id) {
    console.log('deleting');
    return this.http.delete(`${this.uri}/${id}`);
  }
}
