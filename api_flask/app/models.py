from app import db, ma

class Tracker(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  tracker_name = db.Column(db.String(64))
  root_url = db.Column(db.String(128))
  search_text = db.Column(db.String(128))
  min_price = db.Column(db.Numeric(2))
  max_price = db.Column(db.Numeric(2))
  notify_email = db.Column(db.String(64))
  notify_unit = db.Column(db.String(20))
  notify_interval = db.Column(db.Numeric(2))
  last_notified = db.Column(db.Date())
  
  def __repr__(self):
    return '<Tracker {}>'.format(self.tracker_name)

class TrackerSchema(ma.Schema):
  class Meta:
    fields = ('tracker_name', 'root_url', 'search_text',
    'min_price', 'max_price', 'notify_email', 'notify_unit', 
    'notify_interval', 'last_notified')