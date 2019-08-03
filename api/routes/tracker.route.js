const express = require('express');
const app = express();
const trackerRoutes = express.Router();

const Tracker = require('../models/Tracker');

trackerRoutes.route('/add').post(function(req, res) {
  const tracker = new Tracker(req.body);

  tracker.save()
    .then(tracker => {
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
  Tracker.findById(req.params.id, function(err, tracker) {
    if (!tracker) {
      return next(new Error(`Requested ID not found ${req.params.id}`));
    } else {
      tracker.tracker_name = req.body.tracker_name;
      tracker.root_url = req.body.root_url;
      tracker.search_text = req.body.search_text;
      tracker.min_price = req.body.min_price;
      tracker.max_price = req.body.max_price;

      //todo abstraction for setting updated properties and returning id+updated
      tracker.save()
        .then(tracker => {
          res.json({tracker: {
            id: tracker.id,
            root_url: tracker.root_url,
            search_text: tracker.search_text,
            min_price: tracker.min_price,
            max_price: tracker.max_price,
          }});
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