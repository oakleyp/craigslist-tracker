const express = require('express');
const app = express();
const trackerRoutes = express.Router();

const timeConv = require('../lib/tracker/timeConv');
const Tracker = require('../models/Tracker');

trackerRoutes.route('/').post(function(req, res) {
  const tracker = new Tracker(req.body.tracker);

  tracker.save()
    .then(body => {
      res.status(201).json(tracker);
    })
    .catch(err => {
      res.status(400).json({message: `Failed to save tracker: ${err}`});
    });
})

trackerRoutes.route('/').get(function(req, res) {
  Tracker.find(function(err, trackers) {
    if (err) {
      res.json({message: `Error finding trackers for index route: ${err}`});
    } else {
      res.json({trackers});
    }
  });
});

trackerRoutes.route('/:id').get(function (req, res) {
  Tracker.findById(req.params.id, function(err, tracker) {
    if (!tracker) {
      res.status(404).json({message: `No tracker was found for ID ${req.params.id}`})
    } else {
      res.json({tracker});
    }
  })
}); 

trackerRoutes.route('/:id').put(function(req, res) {
  Tracker.findById(req.params.id, function(err, tracker) {
      if (err) {
        res.json({message: `failed to save tracker: ${err}`});
      } else {
        Object.assign(
          tracker, 
          req.body.tracker, 
        );

        tracker.notify_interval = timeConv.convertToNotifyInterval(tracker.notify_every, tracker.notify_unit);

        if (!tracker.notify_every) {
          res.status(400).json({message: 'Error: invalid notify_unit or 0 specified for param notify_every'});
        }

        tracker.save()
          .then(tracker => {
            res.json({tracker});
          })
          .catch(err => {
            res.status(400).json({message: `Failed to update tracker ${err}`});
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