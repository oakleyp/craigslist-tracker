import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  uri = 'http://localhost:4000/tracker';

  constructor(private http: HttpClient) { }

  addTracker(tracker_name, root_url, search_text, min_price, max_price) {
    const tracker = {
      tracker_name,
      root_url,
      search_text,
      min_price,
      max_price,
    };

    console.log('saving', {tracker});

    return this.http.post(`${this.uri}/add`, tracker)
      .subscribe(res => console.log('saved', {res}));
  }

  listTrackers() {
    return this.http.get(`${this.uri}`);
  }

  getTracker(id) {
    return this.http.get(`${this.uri}/${id}`);
  }

  updateTracker(id, tracker_name, root_url, search_text, min_price, max_price) {
    const tracker = {
      tracker_name,
      root_url,
      search_text,
      min_price,
      max_price,
    };

    return this.http.post(`${this.uri}/${id}`, tracker)
      .subscribe(tracker => tracker);
  }

  deleteTracker(id) {
    console.log('deleting');
    return this.http.delete(`${this.uri}/${id}`);
  }
}
