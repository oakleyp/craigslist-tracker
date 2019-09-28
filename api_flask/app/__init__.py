from flask import Flask
from flask_cors import CORS
from config import Config
from flask_mongoengine import MongoEngine
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from mongoflask import MongoJSONEncoder, ObjectIdConverter

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
app.json_encoder = MongoJSONEncoder
app.url_map.converters['objectid'] = ObjectIdConverter
db = MongoEngine(app)
migrate = Migrate(app, db)
ma = Marshmallow(app)

from app import routes, models

if __name__ == '__main__':
    app.run(debug=True)