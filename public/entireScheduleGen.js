var app = angular.module('nfl_app', ['ui.router', 'ngCookies']);

app.factory("NFL_Api", function factoryFunction($http) {
  // Creates an object for the returned results to be stored to
  var service = {};
  // Makes a call to server.py to return all NFL teams
  service.displayAllTeams = function() {
    return $http({
      url: '/api/all_teams'
    });
  };

  service.singleTeam = function(currName) {
    return $http({
      url: '/api/specific_teams',
      method: 'GET',
      params: {
        name: currName
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
app.controller('AllTeamsController', function($scope, $rootScope, NFL_Api) {

  // Service call for the data requested from the data base
  NFL_Api.displayAllTeams().success(function(results) {
    // The teams are stored in a $scope variable, and sorted into the two arrays using the $scope.sortTeams method
    $scope.allTeams = results;
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

app.controller('ScheduleGeneratorController', function($scope, $rootScope, NFL_Api) {
  $scope.teamSched = [];
  // Service call for the data requested from the data base
  NFL_Api.displayAllTeams().success(function(results) {
    // The teams are stored in a $scope variable, and sorted into the two arrays using the $scope.sortTeams method
    $scope.allTeams = results;
    $scope.SchedGen();
  });

  $scope.SchedGen = function() {
    for (var i = 0; i < $scope.allTeams.length; i++) {
      NFL_Api.singleTeam($scope.allTeams[i].name).success(function(result) {
        $scope.team = result;
        console.log($scope.team);
        $scope.addDivisionOpponent($scope.team);
      });
    }
  }

  $scope.addDivisionOpponent = function(currTeam) {
    $scope.x = 1;

    for (var i = 0; i < $scope.allTeams.length; i++) {

      if ($scope.allTeams[i].division === currTeam.division) {

        $scope.teamSched.push({'team': team.name, 'week': $scope.x, 'opponent': otherTeam.name});
        x += 1;
      }
      // NFL_Api.updateTeamSchedule($scope.teamSched).success(function(result) {});
    }
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
      url : '/create_schedule',
      templateUrl: 'sched_gen.html',
      controller: 'ScheduleGeneratorController'
    });
});
