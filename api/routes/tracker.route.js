const express = require('express');
const app = express();
const trackerRoutes = express.Router();

const timeConv = require('../lib/timeConv');

const Tracker = require('../models/Tracker');

trackerRoutes.route('/add').post(function(req, res) {
  const tracker = new Tracker(req.body.tracker);

  tracker.save()
    .then(body => {
      console.log('tracker', tracker);
      res.status(201).json(tracker);
    })
    .catch(err => {
      res.status(400).send(`Failed to save tracker: ${err}`);
    });
})

trackerRoutes.route('/').get(function(req, res) {
  Tracker.find(function(err, trackers) {
    if (err) {
      console.log(`Error finding trackers for index route: ${err}`);
    } else {
      res.json(trackers);
    }
  });
});

trackerRoutes.route('/:id').get(function (req, res) {
  Tracker.findById(req.params.id, function(err, tracker) {
    if(err) {
      res.status(500).json({message: `An error occurred while trying to retrieve tracker ${req.params.id}: ${err}`});
    } else if (!tracker) {
      res.status(404).json({message: `No tracker was found for ID ${req.params.id}`})
    } else {
      res.json(tracker);
    }
  })
}); 

trackerRoutes.route('/update/:id').post(function(req, res) {
  // console.log('got', req.params.id, body)
  Tracker.findById(req.params.id, function(err, tracker) {
      if (err) {
        res.json({message: `failed to save tracker: ${err}`});
      } else {
        //todo abstraction for setting updated properties and returning id+updated

        // update tracker object and notify_interval
        Object.assign(
          tracker, 
          req.body.tracker, 
        );

        tracker.notify_interval = timeConv.convertToNotifyInterval(tracker.notify_every, tracker.notify_unit);

        console.log('update is ', tracker);

        tracker.save()
          .then(tracker => {
            res.json({tracker});
          })
          .catch(err => {
            res.status(400).send(`Failed to update tracker ${err}`);
          });
      }
  });
});

trackerRoutes.route('/:id').delete(function(req, res) {
  Tracker.findByIdAndRemove({_id: req.params.id}, function(err, tracker) {
    if (err) {
      res.json({message: `Failed to delete tracker ${req.params.id}: ${err}`});
    } else {
      res.status(204);
    }
  });
});

module.exports = trackerRoutes;