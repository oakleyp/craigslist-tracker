from app import db, ma
from mongoengine.errors import ValidationError
from app.lib.tracker.validators import valid_notify_interval

class Tracker(db.Document):
  _id = db.ObjectIdField()
  tracker_name = db.StringField()
  root_url = db.StringField()
  search_text = db.StringField()
  min_price = db.IntField()
  max_price = db.IntField()
  notify_email = db.EmailField()
  notify_every = db.IntField()
  notify_unit = db.StringField()
  notify_interval = db.IntField(validation=valid_notify_interval)
  last_notified_date = db.DateTimeField()
  
  def __repr__(self):
    return '<Tracker {}>'.format(self.tracker_name)

class TrackerSchema(ma.Schema):
  class Meta:
    # the following fields will be exposed when dumping to json:
    fields = ('_id', 'tracker_name', 'root_url', 'search_text',
    'min_price', 'max_price', 'notify_email', 'notify_every', 'notify_unit', 
    'notify_interval', 'last_notified_date')

    # the following fields can be modified or set on object creation:
    writeable_fields = ('tracker_name', 'root_url', 'search_text',
    'min_price', 'max_price', 'notify_email', 'notify_every', 'notify_unit', 
    'notify_interval', 'last_notified_date')