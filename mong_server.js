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
  Team.find()
  .then(function(teams) {
    res.json(
      teams
    );
  });
});

app.get('/api/specific_teams', function(req, res) {
  var queryPrms = req.query.prms;

  if (queryPrms === 'name') {
    Team.find({name: req.query.name})
    .then(function(teams) {
      res.json(
        teams
      );
    });
  }

  else if (queryPrms === 'division') {
    Team.find({division: req.query.name})
    .then(function(teams) {
      res.json(
        teams
      );
    });
  }
});

app.post('/api/update_sched', function(req, res) {
  Team.update(
    {name: req.body.team},
    {
      $push: {
        schedule:
          { week: req.body.week, opponent: req.body.opponent }
      },
      $pull: {
        weeksLeft:
          { $in:
            [req.body.week]
          }
      }
    }
  ).then(function(result) {
    console.log('Success');
  })
  .catch(function(err) {
    console.log('Error', err.message);
  });
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


app.listen(3000, function() {
  console.log('Listening on 3000');
});

// Team.create({
//   name: 'Atlanta Falcons',
//   division: 'NFC South',
//   conference: 'NFC',
//   weeksLeft: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
//   schedule: [{
//   }]
// });

// User.create({
//   _id: 'guy',
//   website: 'www.buddy.com',
//   avatar_url: '@notyourfriend'
// });

// Follow.create(
//   {
//     follower: 'robdunn220',
//     following: 'guy'
//   }
// )
// .then(function(res) {
//   console.log(res.follower + ' is following', res.following);
// })
// .catch(function(err) {
//   console.log('Error: ', err.message);
// });

// Tweet.create({
//   text: 'Im not your buddy, pal!',
//   timestamp: new Date(),
//   userID: 'guy'
// })
// .then(function(res) {
//   console.log(res);
// });

// world timeline

// Tweet.find()
// .then(function(tweets) {
//   console.log('Timeline: ', tweets);
// });
//
// // user profile page
//

// var theUserID = 'robdunn220';
//
// bluebird.all([
//   User.findById(theUserID),
//   Tweet.find({ userID: theUserID })
//   .then(function(tweets) {
//     console.log(tweets);
//   })
// ]);

//
// // your timeline
// //
// var theUserID = 'guy';
// Follow.find({ follower: theUserID })
//   .then(function(follows) {
//     var followingIds = follows.map(function(follow) {
//       return follow.following;
//     });
//     // find all following's tweets
//     return Tweet.find({
//       userID: {
//         $in: followingIds.concat([theUserID])
//       }
//     });
//   })
//   .then(function(tweets) {
//     console.log(tweets);
//   });
