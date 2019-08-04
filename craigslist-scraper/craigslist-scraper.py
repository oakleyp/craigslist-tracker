# This is a first script in python, here goes nothing
import urllib.parse
import feedparser
import pymongo
import sys
from datetime import datetime
from pymongo import errors

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['ng-craigslist-tracker']
trackers_coll = db['tracker']

def get_updated_tracker_listings(trackers):
  result = {}
  update_trackers(trackers)

  for tracker in trackers.find():
    updated_listings = db['tracker_listings'].aggregate([
      { '$redact': {
          '$cond': {
            'if': {
              '$and': [
                { '$eq': [ '$tracker_id', tracker['_id'] ] },
                { '$or': [
                  { '$lt': [ '$last_notified_date', 1 ] }, # if there's never been a notification for this listing
                  { '$and': [
                    { '$gte': [ # we're due for a notification
                      { '$subtract': [datetime.now(), '$last_notified_date'] },
                      tracker['notify_interval']
                    ] },
                    { '$gt': [ # this has been updated since the last time it was in a notification
                      '$last_update_date', '$last_notified_update'
                    ] },
                  ] },
                ] },
              ],
            },
            'then': '$$KEEP',
            'else': '$$PRUNE'
          }
      } }
    ])

    result[tracker['_id']] = list(updated_listings)

  return result

# get a given number of listings given a tracker object
def get_listings(tracker, count):
  # return []
  rcount = 0
  results = []
  url_token = ""

  while rcount < count:
    url = "{}?format=rss&query={}{}".format(tracker['root_url'], urllib.parse.quote_plus(tracker['search_text']), url_token)
    feed = feedparser.parse(url)

    for index in range(len(feed['entries'])):
      feed_item = feed['entries'][index]

      if index + (rcount-1) > count: break # we've reached the requested number of results

      item = {
        '_id': feed_item['id'], # craigslist returns link as id
        'title': feed_item['title'],
        'updated': feed_item['issued'],
      }

      results.append(item)
      rcount += 1

    url_token = "&s={}".format(rcount)

  return results

# updates the tracker_listings collection for all items in tracker collection
def update_trackers(trackers):
  for tracker in trackers.find():
    listings = get_listings(tracker, 10)

    # print ('got listings', listings)

    for listing in listings:
      db['tracker_listings'].update_one(
        {'_id': listing['_id']},
        {
          '$setOnInsert': {'insertion_date': datetime.now()},
          '$set': {
            'title': listing['title'],
            'tracker_id': tracker['_id'], 
            'last_update_date': datetime.strptime(listing['updated'], "%Y-%m-%dT%H:%M:%S%z"),
            'last_checked_date': datetime.now(),
          }
        },
        upsert=True,
      )

def format_listings_email(listings):
  email = ""


def notify_users(trackers):
  updated_listings = get_updated_tracker_listings(trackers)
  print ('notifying for listings', updated_listings)

  for tracker_id, listings in updated_listings.items():
    if (len(listings)) == 0: return
    tracker = trackers.find_one(tracker_id)
    trackers.update_one({'_id': tracker_id}, {'$set': { 'last_notified_date': datetime.now() }})
    listing_ids = list(map(lambda listing: listing['_id'], listings))

    for listing in db['tracker_listings'].find({'_id': {'$in': listing_ids } }):
      db['tracker_listings'].update_one({'_id': listing['_id']}, 
        { '$set': {
          'last_notified_date': datetime.now(), 
          'last_notified_update': listing['last_update_date'],
        } }
      )

    print ('notifying email', tracker['notify_email'])

notify_users(trackers_coll)