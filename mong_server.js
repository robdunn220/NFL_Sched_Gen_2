var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nfl");
var bluebird = require("bluebird");
mongoose.Promise = bluebird;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static("public"));

const Team = mongoose.model("Team", {
  name: String,
  division: String,
  conference: String,
  weeksLeft: [Number],
  schedule: []
});

app.get('/api/all_teams', function(req, res) {
  Team.find().sort({'-schedule.week': -1})
  .then(function(teams) {
    res.json(
      teams
    );
  });
});

app.get('/api/specific_teams', function(req, res) {
  console.log(teams);
  Team.find({name: {
    $in: [req.query.name]}
  })
  .then(function(teams) {
    res.json(
      teams
    );
  });
});

app.post('/api/update_sched', function(req, res) {
  console.log(req.body.teams);
  for (var i = 0; i < req.body.teams.length; i++) {
    Team.update(
      {name: req.body.teams[i].team},
      {
        $push: {
          schedule:
            { week: req.body.teams[i].week, opponent: req.body.teams[i].opponent }
        },
        $pull: {
          weeksLeft:
            { $in:
              [req.body.teams[i].week]
            }
        }
      }
    ).then(function(result) {

    })
    .catch(function(err) {

    });
  }
});

// Team.update(
//   {conference: 'NFC'},
//   {
//     $set: {
//             schedule: [], weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
//           }
//   },
//   {upsert: true, multi: true}
//   ).then(function(result) {
//     console.log('Success');
//   })
//   .catch(function(err) {
//     console.log('Error', err.message);
//   });

// Team.create({
//   name: 'Dallas Cowboys',
//   division: 'NFC East',
//   conference: 'NFC',
//   weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
//   schedule: []
// }).then(function(result) {
//   console.log('Success');
// });
//
// Team.create({
//   name: 'New York Giants',
//   division: 'NFC East',
//   conference: 'NFC',
//   weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
//   schedule: []
// }).then(function(result) {
//   console.log('Success');
// });
//
// Team.create({
//   name: 'Philadelphia Eagles',
//   division: 'NFC East',
//   conference: 'NFC',
//   weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
//   schedule: []
// }).then(function(result) {
//   console.log('Success');
// });
//
// Team.create({
//   name: 'Washington Redskins',
//   division: 'NFC East',
//   conference: 'NFC',
//   weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
//   schedule: []
// }).then(function(result) {
//   console.log('Success');
// });

app.listen(3000, function() {
  console.log('Listening on 3000');
});
