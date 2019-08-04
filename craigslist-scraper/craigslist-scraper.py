# This is a first script in python, here goes nothing
import urllib.parse
import feedparser
import pymongo
import sys
from datetime import datetime

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['ng-craigslist-tracker']
trackers = db['tracker']

# get a given number of listings given a tracker object
def get_listings(tracker, count):
  rcount = 0
  results = []
  url_token = ""

  while rcount < count:
    url = "{}?format=rss&query={}{}".format(tracker['root_url'], urllib.parse.quote_plus(tracker['search_text']), url_token)
    feed = feedparser.parse(url)

    for index in range(len(feed['entries'])):
      feed_item = feed['entries'][index]

      if index + rcount > count: break # we've reached the requested number of results
      if not feed_item: return results # we've run out of results, return what we have

      item = {
        '_id': feed_item['id'], # craigslist returns link as id
        'title': feed_item['title'],
        'issue_date': feed_item['updated'],
      }

      results.append(item)
      rcount += 1

    url_token = "&s={}".format(rcount)

  return results

# updates the tracker_listings collection for all items in tracker collection
def update_trackers():
  for tracker in trackers.find():
    listings = get_listings(tracker, 500)

    for listing in listings:
      db['tracker_listings'].update_one(
        {'_id': listing['_id']},
        {
          '$setOnInsert': {'insertion_date': datetime.now()},
          '$set': {'tracker_id': tracker['_id'], 'last_update_date': datetime.now()}
        },
        upsert=True,
      )

update_trackers()
# notify_user()