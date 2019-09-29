from app import app, db
from app.models import Tracker, TrackerSchema
from app.lib.tracker.timeconv import convert_to_notify_interval
from flask import request, jsonify, abort
from bson import ObjectId
from mongoengine.errors import ValidationError

tracker_schema = TrackerSchema()
trackers_schema = TrackerSchema(many=True)

@app.route('/tracker', methods=['POST'])
def add_tracker():
  tracker_fields = TrackerSchema.Meta.writeable_fields

  new_tracker = Tracker(**{field:request.json['tracker'].get(field) for field in tracker_fields})

  try:
    notify_every, notify_unit = [request.json['tracker'][x] for x in ('notify_every', 'notify_unit')]
    new_tracker['notify_interval'] = convert_to_notify_interval(notify_every, notify_unit)
  except:
    return jsonify({'message': "Invalid notify_unit or notify_every provided"}), 400
    
  try:
    new_tracker.save()
  except ValidationError as err:
    return jsonify({'message': f"Error: the tracker object provided is not valid - {err}"}), 400

  response = {'tracker': tracker_schema.dump(new_tracker)}

  return jsonify(response)

@app.route('/trackers/', methods=['GET'])
@app.route('/trackers/index', methods=['GET'])
def index_trackers():
  all_trackers = Tracker.objects
  result = trackers_schema.dump(all_trackers)
  response = {'trackers': result}

  return jsonify(response)

@app.route('/tracker/<id>', methods=['GET'])
def get_tracker(id):
  tracker = Tracker.objects.get_or_404(_id=ObjectId(id))
  
  response = {'tracker': tracker_schema.dump(tracker)}
  return jsonify(response)

@app.route('/tracker/<id>', methods=['PUT'])
def update_tracker(id):
  tracker = Tracker.objects.get_or_404(_id=ObjectId(id))

  tracker_fields = TrackerSchema.Meta.writeable_fields

  for field in tracker_fields:
    tracker[field] = request.json['tracker'].get(field)

  try:
    notify_every, notify_unit = [request.json['tracker'][x] for x in ('notify_every', 'notify_unit')]
    tracker['notify_interval'] = convert_to_notify_interval(notify_every, notify_unit)
  except:
    return jsonify({'message': "Invalid notify_unit or notify_every provided"}), 400
    
  try:
    tracker.save()
  except ValidationError as err:
    return jsonify({'message': f"Error: the tracker object provided is not valid - {err}"}), 400

  response = {'tracker': tracker_schema.dump(tracker)}

  return jsonify(response)

@app.route('/tracker/<id>', methods=['DELETE'])
def delete_tracker(id):
  tracker = Tracker.objects(_id=ObjectId(id))

  if tracker.count() == 0:
    abort(404)

  tracker.delete()

  return '', 204
  
if __name__ == '__main__':
    app.run(debug=True)