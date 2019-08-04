export default class Tracker {
  tracker_name: string;
  root_url: string;
  search_text: string;
  min_price: number;
  max_price: number;
  notify_email: string;
  notify_every: string;
  notify_unit: string;
  last_notified: Date;
}