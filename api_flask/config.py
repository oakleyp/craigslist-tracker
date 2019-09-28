import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
  MONGODB_DB = os.environ.get('MONGODB_DB') or \
    'ng-craigslist-tracker'
  MONGODB_HOST = os.environ.get('MONGODB_HOST') or \
    'localhost'
  MONGODB_PORT = os.environ.get('MONGODB_PORT') or \
    27017
  MONGODB_USERNAME = os.environ.get('MONGODB_USERNAME') or \
    None
  MONGODB_PASSWORD = os.environ.get('MONGODB_PASSWORD') or \
    None