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

  service.singleTeam = function(currName, oppName) {
    return $http({
      url: '/api/specific_teams',
      method: 'GET',
      params: {
        name: currName,
        oppName: oppName
      }
    });
  };

  service.updateTeamSchedule = function(teams) {
    return $http({
      url: '/api/update_sched',
      method: 'POST',
      data: {
        teams: teams
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
      } else if ($scope.allTeams[i].conference === 'NFC') {
        $scope.NFClist.push($scope.allTeams[i]);
        $scope.nfc = $scope.allTeams[i].conference;
      }
    }
  };
});

app.controller('ScheduleGeneratorController', function($scope, NFL_Api) {
  $scope.teamSched = [];
  $scope.count = 0;

  $scope.sched_gen = function() {

    if ($scope.count < 16) {
      NFL_Api.displayAllTeams().success(function(results) {
        // The teams are stored in a $scope variable, and sorted into the two arrays using the $scope.sortTeams method
        $scope.allTeams = results;

        $scope.divOpps($scope.allTeams[$scope.count]);
      });
    }
  };

  $scope.divOpps = function(team) {

    console.log(team.name);
    $scope.allTeams.forEach(function(otherTeam) {

      if (otherTeam.division === team.division && otherTeam.name !== team.name) {
        $scope.teamSched.push({'team': team.name, 'week': 1, 'opponent': otherTeam.name});
        $scope.teamSched = [];
        $scope.sched_gen();
        // NFL_Api.updateTeamSchedule($scope.teamSched).success(function(result) {});
      }
    });

    console.log('Count', $scope.count);
    $scope.count++;
  };

  // $scope.otherDivOpps = function(team) {
  //   console.log(team.name);
  //   $scope.count++;
  //   $scope.allTeams.forEach(function(otherTeam) {
  //     if (otherTeam.division !== team.division && otherTeam.conference === team.conference) {
  //       $scope.teamSched.push({'team': team.name, 'week': 1, 'opponent': otherTeam.name});
  //     }
  //   });
  //
  //   // NFL_Api.updateTeamSchedule($scope.teamSched).success(function(result) {});
  //   $scope.teamSched = [];
  // };

  $scope.sched_gen();
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
      url : '/create_schedule',
      templateUrl: 'sched_gen.html',
      controller: 'ScheduleGeneratorController'
    });
});
