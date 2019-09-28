from app import app, db
from app.models import Tracker, TrackerSchema
from flask import request, jsonify

tracker_schema = TrackerSchema()
trackers_schema = TrackerSchema(many=True)

@app.route('/tracker', methods=['POST'])
def add_tracker():
  tracker_fields = TrackerSchema.Meta.fields
  new_tracker = Tracker(*[request.json[field] for field in tracker_fields])

  db.session.add(new_tracker)
  db.session.commit()

  response = {'tracker': new_tracker}

  return jsonify(response)

@app.route('/trackers/', methods=['GET'])
@app.route('/trackers/index', methods=['GET'])
def index_trackers():
  all_trackers = Tracker.query.all()
  result = trackers_schema.dump(all_trackers)
  response = {'trackers': result}

  return jsonify(response)

@app.route('/tracker/<id>', methods=['GET'])
def get_tracker(id):
  tracker = Tracker.query.get(id)
  if tracker is None:
    return None, 404
  
  response = {'tracker': tracker_schema.dump(tracker)}
  return jsonify(response)

@app.route('/tracker/<id>', methods=['PUT'])
def update_tracker(id):
  tracker = Tracker.query.get(id)

  if tracker is None:
    return None, 404

  tracker_fields = TrackerSchema.Meta.fields

  for field in tracker_fields:
    tracker[field] = request.json[field]

  db.session.commit()

  return tracker_schema.jsonify(tracker)

@app.route('/tracker/<id>', methods=['DELETE'])
def delete_tracker(id):
  tracker = Tracker.query.get(id)

  if tracker is None:
    return None, 404

  db.session.delete(tracker)
  db.session.commit()

  return tracker_schema.jsonify(tracker)
  
if __name__ == '__main__':
    app.run(debug=True)