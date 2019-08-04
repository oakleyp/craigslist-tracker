# Craigslist Tracker

A web app for creating customizable Craigslist trackers that notify you when new or updated listings match your criteria.

This app is currently at the weekend hackathon level of functionality. If you're comfortable building MEAN apps and setting up a cron job, this may be what you're looking for. This README will include some details of setting this up on a local server, but an unconventionally unpleasant amount of assembly is required at its current state.

I have practically no prior experience writing scripts in python, and relatively little prior experience writing MEAN apps, this is just an excercise in trying to familiarize myself with working in those environments. Therein lies the reason for this disclaimer - despite my attempts to follow best practices while learning and building this over a weekend, this is in no way an enterprise-grade example yet. I was happy to see that Angular seems to work similar to any heavy JS framework with a lot of FRP concepts, and python seems to be not far off from ruby or perl where I'm comfortable.

## Working environment
* MongoDB 3.4.6
* Node v10.16.0
* Python 3.7.4
* Angular 8.1.3

## Running locally

Run `npm install` in the root of this repo.

Run `npm install` in the `/api` directory of this repo.

Run `pip install requirements.txt` in the `/craigslist-scraper` directory of this repo, ideally in a python 3.7.4 virtualenv.

Run `mongod` to start the mongo daemon.

Run `nodemon server` in the `/api` directory to spin up the node server.

Run `ng serve` in the root of the repo.

In `src/app/tracker.service.js`, make sure that the "uri" property matches what is set in `api/server.js` for the "port" value.

In `api/DB.js`, make sure that the port in the mongo connection string matches the port mongodb is running on.

In `craigslist-scraper/craigslist-scraper.py`, make sure that the pymongo.MongoClient connection string matches your mongodb port, and that the yagmail.SMTP string matches the gmail address that you'd like to send notifications from.

Run `craigslist-scraper/craigslist-scraper.py`, once, to make sure that your email password is saved in the keyring for your OS.

Set up a cron job for the `craigslist-scraper/craigslist-scraper.py` script so that it runs at the minimum interval you want to be notified of listing updates.

Go to `localhost:4200/tracker` to start using the app.

Ideally I will be able to build this into a docker container once this app is more mature.