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

all_trackers = trackers_coll.find()

def get_updated_tracker_listings(trackers):
  result = {}
  update_trackers(trackers)
  print ('checku', trackers)

  for tracker in trackers.find():
    print ('checking', tracker, type(tracker), list(db['tracker_listings'].find()))

    # tracker_listings = db['tracker_listings'].find({"tracker_id": tracker['_id']})

    updated_listings = db['tracker_listings'].aggregate([
      { '$redact': {
          '$cond': {
            'if': {
              '$and': [
                { '$eq': [ '$tracker_id', tracker['_id'] ] },
                { '$or': [
                  { '$lt': [ '$last_notified_date', 1 ] },
                  { '$gte': [
                    { '$subtract': ['$last_update_date', '$last_notified_date'] },
                    tracker['notify_interval']
                  ] },
                ] },
              ],
            },
            'then': '$$KEEP',
            'else': '$$PRUNE'
          }
      } }
    ])

    print ("got updated listings", list(updated_listings))

    result[tracker['_id']] = updated_listings

    # for listing in tracker_listings:
    #   # if the last_update_date is now or after when this cron is running, this listing has been updated
    #   print ('checking', datetime.now(), listing['last_update_date'] )
    #   if ((datetime.now() - listing['last_update_date'])[tracker['notify_unit']] >= tracker['notify_every']
    #     and tracker['last_notified_date'] < listing['last_update_date']):
    #     result.append(listing)

  return result

# get a given number of listings given a tracker object
def get_listings(tracker, count):
  return []
  rcount = 0
  results = []
  url_token = ""

  while rcount < count:
    url = "{}?format=rss&query={}{}".format(tracker['root_url'], urllib.parse.quote_plus(tracker['search_text']), url_token)
    print ("CALLING CS!!!")
    feed = feedparser.parse(url)

    for index in range(len(feed['entries'])):
      feed_item = feed['entries'][index]

      if index + rcount > count: break # we've reached the requested number of results
      if not feed_item: return results # we've run out of results, return what we have

      item = {
        '_id': feed_item['id'], # craigslist returns link as id
        'title': feed_item['title'],
        'updated': feed_item['updated'],
      }

      results.append(item)
      rcount += 1

    url_token = "&s={}".format(rcount)

  return results

# updates the tracker_listings collection for all items in tracker collection
def update_trackers(trackers):
  for tracker in trackers.find():
    listings = get_listings(tracker, 10)

    print ('got listings', listings)

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

def notify_users(trackers):
  # TODO collate updated listings by tracker
  updated_listings = get_updated_tracker_listings(trackers)
  print ('notifying for listings', updated_listings)


  # for updated_listing in get_updated_tracker_listings(trackers):
  #   tracker = trackers.find({'_id': updated_listing['tracker_id']})
  #   print ('notifying user', tracker['notify_email'])

notify_users(trackers_coll)