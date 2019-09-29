import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  uri = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  addTracker(tracker) {
    return this.http.post(`${this.uri}/tracker`, {tracker});
  }

  listTrackers() {
    return this.http.get(`${this.uri}/trackers`);
  }

  getTracker(id) {
    return this.http.get(`${this.uri}/tracker/${id}`);
  }

  updateTracker(id, tracker) {
    return this.http.put(`${this.uri}/tracker/${id}`, {tracker});
  }

  deleteTracker(id) {
    return this.http.delete(`${this.uri}/tracker/${id}`);
  }
}
