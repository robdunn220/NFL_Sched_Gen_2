var app = angular.module('nfl_app', ['ui.router', 'ngCookies']);

app.factory("NFL_Api", function factoryFunction($http, $rootScope) {
  // Creates an object for the returned results to be stored to
  var service = {};
  // Makes a call to server.py to return all NFL teams
  service.displayAllTeams = function() {
    return $http({
      url: '/api/all_teams'
    });
  };

  service.searchForOpponents = function(param, term) {
    return $http({
      url: '/api/specific_teams',
      method: 'GET',
      params: {
        prms: param,
        name: term
      }
    });
  };

  service.updateTeamSchedule = function(team, week, opponent) {
    return $http({
      url: '/api/update_sched',
      method: 'POST',
      data: {
        team: team,
        week: week,
        opponent: opponent
      }
    });
  };
  // Returns the object after the call is made
  return service;
});

// Controller for the page that displays all NFL teams
app.controller('AllTeamsController', function($scope, NFL_Api) {
  // Service call for the data requested from the data base
  NFL_Api.displayAllTeams().success(function(results) {
    // The teams are stored in a $scope variable, and sorted into the two arrays using the $scope.sortTeams method
    $scope.allTeams = results;
    console.log($scope.allTeams);
    $scope.AFClist = [];
    $scope.NFClist = [];
    $scope.sortTeams();
  });

  // Function that sorts all of the teams into their respective conferences, and then divisions
  $scope.sortTeams = function () {
    for (var i = 0; i < $scope.allTeams.length; i++) {
      if ($scope.allTeams[i].conference === 'AFC') {
        $scope.AFClist.push($scope.allTeams[i]);
        $scope.afc = $scope.allTeams[i].conference;
      }
      else if ($scope.allTeams[i].conference === 'NFC') {
        $scope.NFClist.push($scope.allTeams[i]);
        $scope.nfc = $scope.allTeams[i].conference;
      }
    }
  };
});

app.controller('ScheduleGeneratorController', function($scope, NFL_Api, $rootScope, $cookies, $stateParams) {

  $scope.firstPop = function(callback) {
    NFL_Api.displayAllTeams().success(function(results) {
      callback(results);
    });
  };

  $scope.entireSchedule = function(allTeams) {
    var currentTeam = allTeams[0];
    var divisionOpps = [];
    var weekPickedCurrTeam, weekPickedOtherTeam;
    var divCount = 0;

    // var divSchedule = function(teams, currTeam, divCount) {
    //
    //     $scope.updateSchedule = function(team, week, opponent, dC, callback) {
    //
    //       $scope.updateInfo = function(callback, team, dC) {
    // NFL_Api.displayAllTeams().success(function(results) {
    //   console.log('3rd occurence', dC);
    //   callback(results, team, dC);
    // });
    //       };
    //       $scope.updateInfo(callback, team, dC);
    //     };
    // teams.forEach(function(team) {
    //   if (team.division === currTeam.division && team.name !== currTeam.name) {
            // var randNum = (Math.floor(Math.random() * (currTeam.weeksLeft.length - 1)));
            // weekPickedCurrTeam = currTeam.weeksLeft[randNum];
    //         divCount++;
    //         console.log(team.name);
    //         console.log('1st occurence', divCount);
    //         $scope.updateSchedule(currTeam, weekPickedCurrTeam, team.name, divCount, divSchedule);
    //       }
    //     });
    // };
    var scheduleOpps = function(opponent, currentTeam, callback) {
      var randNum = (Math.floor(Math.random() * (currentTeam.weeksLeft.length - 1)));
      weekPickedCurrTeam = currentTeam.weeksLeft[randNum];
      var update = function(callback) {
          NFL_Api.displayAllTeams().success(function(data) {
            callback(data);
          });
      };

      update(callback);
      NFL_Api.updateTeamSchedule(currentTeam.name, weekPickedCurrTeam, opponent.name).success(function(results) {
      });
      NFL_Api.updateTeamSchedule(opponent.name, weekPickedCurrTeam, currentTeam.name).success(function(results) {
      });
    };

    var divDone = [];
    var divSchedule = function(allTeams) {
      console.log(currentTeam);
      allTeams.forEach(function(team) {
        if (team.division === currentTeam.division && team.name !== currentTeam.name) {
          if (!divDone[team.name]) {
            divDone[team.name] = 1;
            scheduleOpps(team, currentTeam, divSchedule);
          }
          else if (divDone[team.name] === 1) {
            divDone[team.name] = 2;
            scheduleOpps(team, currentTeam, divSchedule);
          }
        }
      });
    };

    divSchedule(allTeams);

    $cookies.put('generated', true);
  };

  if (!$cookies.put('generated')) {
    $scope.firstPop($scope.entireSchedule);
  }

});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name : 'all_teams',
      url : '/teams/nfl',
      templateUrl: 'all_teams.html',
      controller: 'AllTeamsController'
    })
    .state({
      name : 'schedule_generator',
      url : '/create_schedule/{team}',
      templateUrl: 'sched_gen.html',
      controller: 'ScheduleGeneratorController'
    });
});
